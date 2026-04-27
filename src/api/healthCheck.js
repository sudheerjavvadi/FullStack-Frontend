// Service to keep the backend awake by pinging the health endpoint
// Helps prevent Render cold starts

let healthCheckInterval = null;

export const startHealthCheck = () => {
    if (healthCheckInterval) return; // Prevent multiple intervals

    healthCheckInterval = setInterval(() => {
        const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
        fetch(`${API_BASE_URL}/health`, { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).catch(() => {
            // Silently ignore errors - this is just a keep-alive ping
        });
    }, 4 * 60 * 1000); // Ping every 4 minutes to keep server warm
};

export const stopHealthCheck = () => {
    if (healthCheckInterval) {
        clearInterval(healthCheckInterval);
        healthCheckInterval = null;
    }
};
