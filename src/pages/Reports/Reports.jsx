import React, { useState } from "react";
import Table from "../../components/Table/Table";
import "./Reports.scss";

const Reports = () => {
  const [data, setData] = useState([
    {
      datetime: "2025-08-15 10:25",
      photo: "https://example.com/foto1.jpg",
      mechanic: "Budi Santoso",
      machineCode: "MCH-001",
      location: "Line A",
      status: "In Progress",
      notes: "Ganti belt utama",
    },
    {
      datetime: "2025-08-15 11:40",
      photo: "https://example.com/foto2.jpg",
      mechanic: "Agus Setiawan",
      machineCode: "MCH-002",
      location: "Line B",
      status: "Completed",
      notes: "Servis rutin selesai",
    },
    {
      datetime: "2025-08-15 13:15",
      photo: "https://example.com/foto3.jpg",
      mechanic: "Andi Pratama",
      machineCode: "MCH-003",
      location: "Warehouse",
      status: "Waiting Parts",
      notes: "Menunggu bearing",
    },
    {
      datetime: "2025-08-15 14:50",
      photo: "https://example.com/foto4.jpg",
      mechanic: "Rudi Hartono",
      machineCode: "MCH-004",
      location: "Line C",
      status: "In Progress",
      notes: "Kalibrasi sensor",
    },
    {
      datetime: "2025-08-15 15:30",
      photo: "https://example.com/foto5.jpg",
      mechanic: "Eko Wibowo",
      machineCode: "MCH-005",
      location: "QC Area",
      status: "On Hold",
      notes: "Butuh approval supervisor",
    },
  ]);

  const columns = [
    { key: "datetime", label: "Data & Time", sortable: true },
    { key: "photo", label: "Photo" },
    { key: "mechanic", label: "Mechanic Name", sortable: true },
    { key: "machineCode", label: "Engine Code", sortable: true },
    // kolom baru
    { key: "location", label: "Location", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "notes", label: "Notes" },
  ];

  // 🔹 Fungsi sort sederhana
  const handleSort = (key) => {
    const sorted = [...data].sort((a, b) =>
      String(a[key]).localeCompare(String(b[key]))
    );
    setData(sorted);
  };

  return (
    <div className="reports-page">
      <h2>Reports</h2>
      <Table columns={columns} data={data} onSort={handleSort} />
    </div>
  );
};

export default Reports;
