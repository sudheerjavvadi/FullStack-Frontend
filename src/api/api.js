import axios from 'axios';

// In production, set VITE_API_URL to your Render backend URL, e.g.:
// VITE_API_URL=https://your-backend-name.onrender.com/api
// In development, falls back to '/api' which the Vite proxy forwards to localhost:8080
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getCurrentUser: () => api.get('/auth/me'),
};

// User API
export const userAPI = {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    getByRole: (role) => api.get(`/users/role/${role}`),
    getPoliticians: () => api.get('/users/politicians'),
    getPoliticiansByConstituency: (constituency) => api.get(`/users/politicians/constituency/${constituency}`),
    create: (userData) => api.post('/users', userData),
    update: (id, userData) => api.put(`/users/${id}`, userData),
    updateRole: (id, role) => api.put(`/users/${id}/role?role=${role}`),
    toggleStatus: (id) => api.put(`/users/${id}/toggle-status`),
    delete: (id) => api.delete(`/users/${id}`),
    getStats: () => api.get('/users/stats'),
};

// Issue API
export const issueAPI = {
    getAll: () => api.get('/issues'),
    getById: (id) => api.get(`/issues/${id}`),
    getMyIssues: () => api.get('/issues/my-issues'),
    getAssigned: () => api.get('/issues/assigned'),
    getByStatus: (status) => api.get(`/issues/status/${status}`),
    search: (keyword) => api.get(`/issues/search?keyword=${encodeURIComponent(keyword)}`),
    create: (issueData) => api.post('/issues', issueData),
    assign: (id, politicianId) => api.put(`/issues/${id}/assign?politicianId=${politicianId}`),
    respond: (id, response) => api.put(`/issues/${id}/respond`, { response }),
    resolve: (id, resolutionNotes) => api.put(`/issues/${id}/resolve`, { resolutionNotes }),
    updateStatus: (id, status) => api.put(`/issues/${id}/status?status=${status}`),
    delete: (id) => api.delete(`/issues/${id}`),
    getStats: () => api.get('/issues/stats'),
};

// Feedback API
export const feedbackAPI = {
    submit: (feedbackData) => api.post('/feedback', feedbackData),
    getByPolitician: (politicianId) => api.get(`/feedback/politician/${politicianId}`),
    getPoliticianStats: (politicianId) => api.get(`/feedback/politician/${politicianId}/stats`),
    getMyFeedback: () => api.get('/feedback/my-feedback'),
    getReceived: () => api.get('/feedback/received'),
    delete: (id) => api.delete(`/feedback/${id}`),
};

// Update API
export const updateAPI = {
    getAll: () => api.get('/updates'),
    getById: (id) => api.get(`/updates/${id}`),
    getByPolitician: (politicianId) => api.get(`/updates/politician/${politicianId}`),
    getMyUpdates: () => api.get('/updates/my-updates'),
    create: (updateData) => api.post('/updates', updateData),
    update: (id, updateData) => api.put(`/updates/${id}`, updateData),
    delete: (id) => api.delete(`/updates/${id}`),
};

// Comment API
export const commentAPI = {
    getByIssue: (issueId) => api.get(`/comments/issue/${issueId}`),
    add: (issueId, content) => api.post(`/comments/issue/${issueId}`, { content }),
    getFlagged: () => api.get('/comments/flagged'),
    flag: (id, reason) => api.put(`/comments/${id}/flag`, { reason }),
    unflag: (id) => api.put(`/comments/${id}/unflag`),
    delete: (id) => api.delete(`/comments/${id}`),
};

// File API
export const fileAPI = {
    upload: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/files/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    download: (filename) => api.get(`/files/download/${filename}`, { responseType: 'blob' }),
    delete: (filename) => api.delete(`/files/${filename}`),
};

export default api;
