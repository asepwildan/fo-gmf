
import { create } from 'zustand';

import { reportService } from '../services/index.js';

export const useAppStore = create((set, get) => ({
    // Loading states
    loading: {
        reports: false,
        createReport: false,
        updateReport: false,
        deleteReport: false,
        generateQR: false,
    },

    // Data states
    reports: [],
    currentReport: null,
    qrData: null,

    // Error states
    error: null,

    // Actions untuk loading
    setLoading: (key, value) => set((state) => ({
        loading: {
            ...state.loading,
            [key]: value
        }
    })),

    // Actions untuk error
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    // Actions untuk reports
    setReports: (reports) => set({ reports }),
    setCurrentReport: (report) => set({ currentReport: report }),
    setQRData: (qrData) => set({ qrData }),

    // API Actions
    fetchReports: async (params = {}) => {
        const { setLoading, setError, setReports } = get();

        setLoading('reports', true);
        setError(null);

        try {
            const result = await reportService.getReports(params);

            if (result.success) {
                setReports(result.data);
            } else {
                setError(result.error);
            }

            return result;
        } catch (error) {
            const errorMessage = 'Failed to fetch reports';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading('reports', false);
        }
    },

    fetchReport: async (id) => {
        const { setLoading, setError, setCurrentReport } = get();

        setLoading('reports', true);
        setError(null);

        try {
            const result = await reportService.getReport(id);

            if (result.success) {
                setCurrentReport(result.data);
            } else {
                setError(result.error);
            }

            return result;
        } catch (error) {
            const errorMessage = 'Failed to fetch report';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading('reports', false);
        }
    },

    createReport: async (reportData) => {
        const { setLoading, setError, fetchReports } = get();

        setLoading('createReport', true);
        setError(null);

        try {
            const result = await reportService.createReport(reportData);

            if (result.success) {
                // Refresh reports list
                await fetchReports();
            } else {
                setError(result.error);
            }

            return result;
        } catch (error) {
            const errorMessage = 'Failed to create report';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading('createReport', false);
        }
    },

    updateReport: async (id, reportData) => {
        const { setLoading, setError, fetchReports } = get();

        setLoading('updateReport', true);
        setError(null);

        try {
            const result = await reportService.updateReport(id, reportData);

            if (result.success) {
                // Refresh reports list
                await fetchReports();
            } else {
                setError(result.error);
            }

            return result;
        } catch (error) {
            const errorMessage = 'Failed to update report';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading('updateReport', false);
        }
    },

    deleteReport: async (id) => {
        const { setLoading, setError, fetchReports } = get();

        setLoading('deleteReport', true);
        setError(null);

        try {
            const result = await reportService.deleteReport(id);

            if (result.success) {
                // Refresh reports list
                await fetchReports();
            } else {
                setError(result.error);
            }

            return result;
        } catch (error) {
            const errorMessage = 'Failed to delete report';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading('deleteReport', false);
        }
    },

    generateQR: async (reportId) => {
        const { setLoading, setError, setQRData } = get();

        setLoading('generateQR', true);
        setError(null);

        try {
            const result = await reportService.generateQR(reportId);

            if (result.success) {
                setQRData(result.data);
            } else {
                setError(result.error);
            }

            return result;
        } catch (error) {
            const errorMessage = 'Failed to generate QR code';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading('generateQR', false);
        }
    },

    // Helper actions
    reset: () => set({
        loading: {
            reports: false,
            createReport: false,
            updateReport: false,
            deleteReport: false,
            generateQR: false,
        },
        reports: [],
        currentReport: null,
        qrData: null,
        error: null,
    }),
}));

