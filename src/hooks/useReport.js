import { useAppStore } from '../store';
import { useApi } from './useApi';

/**
 * Hook khusus untuk report operations
 */
export const useReport = () => {
    const {
        reports,
        currentReport,
        qrData,
        loading,
        error,
        fetchReports,
        fetchReport,
        createReport,
        updateReport,
        deleteReport,
        generateQR,
        clearError,
    } = useAppStore();

    const { request } = useApi();

    // Wrapper functions dengan additional logic jika diperlukan
    const handleFetchReports = async (params = {}) => {
        return await request(() => fetchReports(params), {
            onSuccess: (data) => {
                console.log(`✅ Fetched ${data.length} reports`);
            },
            onError: (error) => {
                console.error('❌ Failed to fetch reports:', error);
            }
        });
    };

    const handleFetchReport = async (id) => {
        return await request(() => fetchReport(id), {
            onSuccess: (data) => {
                console.log(`✅ Fetched report: ${data.id}`);
            },
            onError: (error) => {
                console.error(`❌ Failed to fetch report ${id}:`, error);
            }
        });
    };

    const handleCreateReport = async (reportData) => {
        return await request(() => createReport(reportData), {
            onSuccess: (data) => {
                console.log(`✅ Created report: ${data.id}`);
            },
            onError: (error) => {
                console.error('❌ Failed to create report:', error);
            }
        });
    };

    const handleUpdateReport = async (id, reportData) => {
        return await request(() => updateReport(id, reportData), {
            onSuccess: (data) => {
                console.log(`✅ Updated report: ${id}`);
            },
            onError: (error) => {
                console.error(`❌ Failed to update report ${id}:`, error);
            }
        });
    };

    const handleDeleteReport = async (id) => {
        return await request(() => deleteReport(id), {
            onSuccess: () => {
                console.log(`✅ Deleted report: ${id}`);
            },
            onError: (error) => {
                console.error(`❌ Failed to delete report ${id}:`, error);
            }
        });
    };

    const handleGenerateQR = async (reportId) => {
        return await request(() => generateQR(reportId), {
            onSuccess: (data) => {
                console.log(`✅ Generated QR for report: ${reportId}`);
            },
            onError: (error) => {
                console.error(`❌ Failed to generate QR for report ${reportId}:`, error);
            }
        });
    };

    return {
        // Data
        reports,
        currentReport,
        qrData,

        // Loading states
        loading,
        isLoadingReports: loading.reports,
        isCreatingReport: loading.createReport,
        isUpdatingReport: loading.updateReport,
        isDeletingReport: loading.deleteReport,
        isGeneratingQR: loading.generateQR,

        // Error
        error,
        clearError,

        // Actions
        fetchReports: handleFetchReports,
        fetchReport: handleFetchReport,
        createReport: handleCreateReport,
        updateReport: handleUpdateReport,
        deleteReport: handleDeleteReport,
        generateQR: handleGenerateQR,
    };
};