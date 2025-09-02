import api from "./api.js";
import { API_ENDPOINTS } from "../utils/constants.js";

export const reportService = {
  getReports: async (params = {}) => {
    try {
      const response = await api.get("/api/reports", { params });
      return { success: true, data: response.data?.data ?? [] };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch reports",
        status: error.response?.status,
      };
    }
  },

  getReport: async (id) => {
    try {
      const response = await api.get(`/api/reports/${id}`); // ← pakai backticks
      return { success: true, data: response.data?.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch report",
        status: error.response?.status,
      };
    }
  },

  createReport: async (reportData) => {
    try {
      const response = await api.post("/api/reports", reportData);
      return { success: true, data: response.data?.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to create report",
        status: error.response?.status,
      };
    }
  },

  updateReport: async (id, reportData) => {
    try {
      const response = await api.put(`/api/reports/${id}`, reportData); // ← backticks
      return { success: true, data: response.data?.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to update report",
        status: error.response?.status,
      };
    }
  },

  deleteReport: async (id) => {
    try {
      await api.delete(`/api/reports/${id}`); // ← backticks
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to delete report",
        status: error.response?.status,
      };
    }
  },

  generateQR: async (reportId) => {
    try {
      const response = await api.get(API_ENDPOINTS.REPORT_QR(reportId));
      return { success: true, data: response.data?.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to generate QR code",
        status: error.response?.status,
      };
    }
  },
};
