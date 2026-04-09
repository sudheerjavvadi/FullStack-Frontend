import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createIssue } from '../store/slices/issueSlice';
import { userAPI, fileAPI } from '../api/api';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiSend } from 'react-icons/fi';

function CreateIssue() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        assignedPoliticianId: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState('');
    const [politicians, setPoliticians] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPoliticians = async () => {
            try {
                const res = await userAPI.getPoliticians();
                setPoliticians(res.data.data);
            } catch (error) {
                console.error('Failed to fetch politicians');
            }
        };
        fetchPoliticians();
    }, []);

    useEffect(() => {
        if (!selectedFile) {
            setFilePreview('');
            return;
        }

        const url = URL.createObjectURL(selectedFile);
        setFilePreview(url);

        return () => URL.revokeObjectURL(url);
    }, [selectedFile]);

    const categories = [
        'Infrastructure',
        'Public Safety',
        'Healthcare',
        'Education',
        'Environment',
        'Transportation',
        'Housing',
        'Employment',
        'Utilities',
        'Other'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                assignedPoliticianId: formData.assignedPoliticianId || null
            };

            if (selectedFile) {
                const uploadRes = await fileAPI.upload(selectedFile);
                const data = uploadRes.data.data;
                payload.attachmentFileName = data.filename;
                payload.attachmentUrl = data.fileDownloadUri;
            }

            await dispatch(createIssue(payload)).unwrap();
            toast.success('Issue reported successfully!');
            navigate('/issues');
        } catch (error) {
            toast.error(error || 'Failed to create issue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="page-container"
            style={{
                maxWidth: '720px',
                margin: '0 auto',
                padding: '2.5rem 1.5rem',
            }}
        >
            <button
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
                style={{ marginBottom: '1.5rem' }}
            >
                <FiArrowLeft /> Back
            </button>

            <div
                className="card"
                style={{
                    background: 'rgba(15, 15, 35, 0.92)',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Report an Issue</h1>
                <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
                    Describe the issue you want to report to your representative.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label className="form-label">Issue Title *</label>
                        <input
                            type="text"
                            name="title"
                            className="form-input"
                            placeholder="Brief title for your issue"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            minLength={5}
                            maxLength={200}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Category *</label>
                        <select
                            name="category"
                            className="form-select"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description *</label>
                        <textarea
                            name="description"
                            className="form-textarea"
                            placeholder="Provide detailed description of the issue..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                            minLength={20}
                            style={{ minHeight: '150px' }}
                        />
                        <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                            Minimum 20 characters. Be as detailed as possible.
                        </p>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="form-input"
                            placeholder="Specific location or area (optional)"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Attach Image or PDF</label>
                        <input
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="form-input"
                            style={{ padding: '0.8rem 1rem' }}
                        />
                        {selectedFile && (
                            <div style={{ marginTop: '0.75rem', color: 'rgba(148, 163, 184, 0.95)' }}>
                                Selected file: <strong>{selectedFile.name}</strong>
                            </div>
                        )}
                        {filePreview && selectedFile?.type?.startsWith('image/') && (
                            <div style={{ marginTop: '1rem' }}>
                                <img
                                    src={filePreview}
                                    alt="Preview"
                                    style={{ width: '100%', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Assign to Politician</label>
                        <select
                            name="assignedPoliticianId"
                            className="form-select"
                            value={formData.assignedPoliticianId}
                            onChange={handleChange}
                        >
                            <option value="">Select a politician (optional)</option>
                            {politicians.map((pol) => (
                                <option key={pol.id} value={pol.id}>
                                    {pol.fullName} {pol.constituency && `(${pol.constituency})`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : <><FiSend /> Submit Issue</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateIssue;
