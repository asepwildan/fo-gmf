import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Log request untuk debugging
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);

        // Add timestamp untuk debugging
        config.metadata = { startTime: new Date() };

        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Log response untuk debugging
        const duration = new Date() - response.config.metadata.startTime;
        console.log(`✅ API Response: ${response.status} ${response.config.url} (${duration}ms)`);

        return response;
    },
    (error) => {
        // Log error untuk debugging
        const status = error.response?.status;
        const url = error.config?.url;
        console.error(`❌ API Error: ${status} ${url}`, error.response?.data);

        // Handle common errors
        if (status === 404) {
            console.warn('Resource not found');
        } else if (status === 500) {
            console.error('Server error occurred');
        } else if (!error.response) {
            console.error('Network error - check if backend is running');
        }

        return Promise.reject(error);
    }
);

export default api;