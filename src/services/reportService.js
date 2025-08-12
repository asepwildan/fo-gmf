import api from './api.js';
import { API_ENDPOINTS } from '../utils/constants.js';

export const reportService = {
    // Get all reports
    getReports: async (params = {}) => {
        try {
            const response = await api.get('/api/reports', { params });
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch reports',
                status: error.response?.status,
            };
        }
    },

    // Get single report by ID
    getReport: async (id) => {
        try {
            const response = await api.get(`/api/reports/${id}`);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to fetch report',
                status: error.response?.status,
            };
        }
    },

    // Create new report
    createReport: async (reportData) => {
        try {
            const response = await api.post('/api/reports', reportData);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to create report',
                status: error.response?.status,
            };
        }
    },

    // Update report
    updateReport: async (id, reportData) => {
        try {
            const response = await api.put(`/api/reports/${id}`, reportData);
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to update report',
                status: error.response?.status,
            };
        }
    },

    // Delete report
    deleteReport: async (id) => {
        try {
            await api.delete(`/api/reports/${id}`);
            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to delete report',
                status: error.response?.status,
            };
        }
    },

    // Generate QR code for report
    generateQR: async (reportId) => {
        try {
            const response = await api.get(API_ENDPOINTS.REPORT_QR(reportId));
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Failed to generate QR code',
                status: error.response?.status,
            };
        }
    },
};

