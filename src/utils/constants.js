export const API_ENDPOINTS = {
    // Reports
    REPORTS: '/api/reports',
    REPORT_BY_ID: (id) => `/api/reports/${id}`,
    REPORT_QR: (id) => `/api/qr/?machineId=${id}`,

    // Future endpoints
    AUTH: {
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        PROFILE: '/api/auth/profile',
    },

    USERS: {
        LIST: '/api/users',
        BY_ID: (id) => `/api/users/${id}`,
    },
};

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

// Request timeouts
export const TIMEOUTS = {
    DEFAULT: 10000,
    UPLOAD: 30000,
    DOWNLOAD: 60000,
};

// API Response Status
export const API_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    LOADING: 'loading',
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    NOT_FOUND: 'Requested resource not found.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    TIMEOUT_ERROR: 'Request timeout. Please try again.',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
};
