/**
 * Format error message berdasarkan error object
 */
export const formatErrorMessage = (error) => {
    if (!error) return ERROR_MESSAGES.GENERIC_ERROR;

    // Jika sudah string
    if (typeof error === 'string') return error;

    // Jika axios error
    if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message;

        switch (status) {
            case HTTP_STATUS.BAD_REQUEST:
                return message || ERROR_MESSAGES.VALIDATION_ERROR;
            case HTTP_STATUS.UNAUTHORIZED:
                return ERROR_MESSAGES.UNAUTHORIZED;
            case HTTP_STATUS.NOT_FOUND:
                return ERROR_MESSAGES.NOT_FOUND;
            case HTTP_STATUS.INTERNAL_SERVER_ERROR:
                return ERROR_MESSAGES.SERVER_ERROR;
            default:
                return message || ERROR_MESSAGES.GENERIC_ERROR;
        }
    }

    // Network error
    if (error.request) {
        return ERROR_MESSAGES.NETWORK_ERROR;
    }

    // Timeout error
    if (error.code === 'ECONNABORTED') {
        return ERROR_MESSAGES.TIMEOUT_ERROR;
    }

    return error.message || ERROR_MESSAGES.GENERIC_ERROR;
};

/**
 * Standardize API response format
 */
export const createApiResponse = (success, data = null, error = null, status = null) => {
    return {
        success,
        data,
        error,
        status,
        timestamp: new Date().toISOString(),
    };
};

/**
 * Handle API response dan return standardized format
 */
export const handleApiResponse = (response) => {
    try {
        return createApiResponse(true, response.data, null, response.status);
    } catch (error) {
        return createApiResponse(false, null, formatErrorMessage(error), error.response?.status);
    }
};

/**
 * Handle API error dan return standardized format
 */
export const handleApiError = (error) => {
    const errorMessage = formatErrorMessage(error);
    const status = error.response?.status;

    return createApiResponse(false, null, errorMessage, status);
};

/**
 * Build query string dari object parameters
 */
export const buildQueryString = (params) => {
    if (!params || Object.keys(params).length === 0) return '';

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            searchParams.append(key, value);
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
};

/**
 * Check apakah environment development
 */
export const isDevelopment = () => {
    return import.meta.env.MODE === 'development';
};

/**
 * Get base API URL
 */
export const getApiBaseUrl = () => {
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
};

/**
 * Log API calls untuk debugging (hanya di development)
 */
export const logApiCall = (method, url, data = null) => {
    if (isDevelopment()) {
        console.group(`🔄 API ${method.toUpperCase()}: ${url}`);
        if (data) {
            console.log('📤 Request Data:', data);
        }
        console.groupEnd();
    }
};

/**
 * Log API response untuk debugging (hanya di development)
 */
export const logApiResponse = (method, url, response, duration = null) => {
    if (isDevelopment()) {
        console.group(`✅ API ${method.toUpperCase()}: ${url}`);
        console.log('📥 Response:', response);
        if (duration) {
            console.log(`⏱️ Duration: ${duration}ms`);
        }
        console.groupEnd();
    }
};

/**
 * Retry API call dengan exponential backoff
 */
export const retryApiCall = async (apiCall, maxRetries = 3, baseDelay = 1000) => {
    let lastError;

    for (let i = 0; i <= maxRetries; i++) {
        try {
            return await apiCall();
        } catch (error) {
            lastError = error;

            if (i === maxRetries) break;

            // Exponential backoff: 1s, 2s, 4s, 8s
            const delay = baseDelay * Math.pow(2, i);
            await new Promise(resolve => setTimeout(resolve, delay));

            console.log(`🔄 Retrying API call (${i + 1}/${maxRetries + 1}) in ${delay}ms...`);
        }
    }

    throw lastError;
};

// Re-export constants
export { API_ENDPOINTS, HTTP_STATUS, TIMEOUTS, API_STATUS, ERROR_MESSAGES };