import { useState, useCallback } from 'react';

/**
 * Generic hook untuk API calls dengan loading dan error handling
 */
export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (apiCall, options = {}) => {
        const {
            onSuccess,
            onError,
            showLoading = true,
            resetError = true
        } = options;

        if (resetError) setError(null);
        if (showLoading) setLoading(true);

        try {
            const result = await apiCall();

            if (result.success) {
                if (onSuccess) onSuccess(result.data);
                return result;
            } else {
                const errorMessage = result.error || 'API call failed';
                setError(errorMessage);
                if (onError) onError(errorMessage);
                return result;
            }
        } catch (err) {
            const errorMessage = err.message || 'Network error occurred';
            setError(errorMessage);
            if (onError) onError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            if (showLoading) setLoading(false);
        }
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        loading,
        error,
        request,
        clearError,
    };
};