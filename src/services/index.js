// src/services/index.js
import api from './api.js';
import { reportService } from './reportService.js';

// Re-export individual
export { api, reportService };

// Default export
export default {
    api,
    reportService,
};