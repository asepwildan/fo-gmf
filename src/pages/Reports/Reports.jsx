import React, { useEffect, useMemo, useState } from "react";
import Table from "../../components/Table/Table";
import "./Reports.scss";
import { useReport } from "../../hooks/useReport"; // ⬅️ NEW

// mapping label status agar rapi di UI
const STATUS_LABEL = {
  Pending: "Pending",
  InProgress: "In Progress",
  Completed: "Completed",
};

// format ke WIB (Asia/Jakarta)
function toWIB(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("id-ID", { timeZone: "Asia/Jakarta", hour12: false });
}

const Reports = () => {
  const {
    reports, // ⬅️ NEW: array dari store (hasil fetch ke /api/reports)
    fetchReports, // ⬅️ NEW: action untuk ambil data
    isLoadingReports, // ⬅️ NEW: loading state
    error, // ⬅️ NEW: error global kalau ada
  } = useReport();

  // Sinkronkan data dari store -> state lokal (agar bisa sort lokal)
  const initialRows = useMemo(() => {
    return (reports || []).map((r) => {
      const d = new Date(r.datetime);
      return {
        datetime: toWIB(r.datetime),
        photo: r.photo || "",
        mechanic: r.mechanic,
        machineCode: r.machineCode,
        location: r.location,
        status: STATUS_LABEL[r.status] || r.status,
        notes: r.notes || "",
        dtSort: d.getTime(), // untuk sort kolom datetime
      };
    });
  }, [reports]); // ⬅️ NEW

  const [rows, setRows] = useState(initialRows); // ⬅️ NEW

  // Saat data store berubah, refresh state lokal
  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]); // ⬅️ NEW

  // Ambil data saat mount
  useEffect(() => {
    // Kamu bisa kirim params kalau store kamu mendukung: fetchReports({ page:1, pageSize:50 })
    fetchReports(); // ⬅️ NEW
  }, []);
  useEffect(() => {
    console.log("INI REPORTS", reports);
  }, [reports]);
  const columns = [
    { key: "datetime", label: "Data & Time", sortable: true },
    { key: "photo", label: "Photo" },
    { key: "mechanic", label: "Mechanic Name", sortable: true },
    { key: "machineCode", label: "Engine Code", sortable: true },
    { key: "location", label: "Location", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "notes", label: "Notes" },
  ];

  // 🔹 Fungsi sort sederhana (pakai state lokal 'rows')
  const handleSort = (key) => {
    const sorted = [...rows].sort((a, b) => {
      if (key === "datetime" && a.dtSort && b.dtSort) {
        return a.dtSort - b.dtSort;
      }
      return String(a[key]).localeCompare(String(b[key]));
    });
    setRows(sorted);
  };

  if (isLoadingReports) {
    return (
      <div className="reports-page">
        <h2>Reports</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error?.reports) {
    return (
      <div className="reports-page">
        <h2>Reports</h2>
        <p style={{ color: "crimson" }}>Error: {String(error.reports)}</p>
      </div>
    );
  }

  return (
    <div className="reports-page">
      <h2>Reports</h2>
      <Table columns={columns} data={rows} onSort={handleSort} />
    </div>
  );
};

export default Reports;
