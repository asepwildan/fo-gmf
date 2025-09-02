import React, { useState } from "react";
import "./Formmechanics.scss";
import DateTimeField from "../../components/DatePicker/DatePicker";
import { useReport } from "../../hooks/useReport";
import { uploadPhoto } from "../../services/uploadService";
const columns = [
  { key: "datetime", label: "Date & Time", sortable: true },
  { key: "photo", label: "Photo" }, // tetap ada untuk URL manual
  { key: "mechanic", label: "Mechanic Name", sortable: true },
  { key: "machineCode", label: "Engine Code", sortable: true },
  { key: "location", label: "Location", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "notes", label: "Notes" },
];

// Map status UI -> API
// Backend kamu saat ini hanya menerima: Pending | InProgress | Completed
function mapStatusToApi(ui) {
  const trimmed = (ui || "").trim();
  if (trimmed === "In Progress") return "InProgress";
  if (trimmed === "Completed") return "Completed";
  // "On Hold" / "Waiting Parts" tidak ada di backend enum sekarang
  // sementara kita mapping ke "Pending"
  if (trimmed === "On Hold" || trimmed === "Waiting Parts") return "Pending";
  return "Pending"; // default aman
}

async function uploadPhotoFile(file) {
  return uploadPhoto(file); // tidak lagi pakai fetch + process.env
}

export default function Formmechanics() {
  const [formData, setFormData] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {})
  );
  const [jsonResult, setJsonResult] = useState(null);
  const [file, setFile] = useState(null); // <-- file foto terpilih
  const [submitting, setSubmitting] = useState(false); // loading state

  const { createReport } = useReport();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1) Siapkan nilai photoUrl:
      let photoUrl = formData.photo?.trim() || ""; // kalau user isi URL manual
      if (file) {
        // kalau user pilih file, upload dulu
        photoUrl = await uploadPhotoFile(file);
      }

      // 2) Bentuk payload untuk API /api/reports (OBJECT, bukan string)
      const payload = {
        datetime: formData.datetime, // "YYYY-MM-DDTHH:mm" atau "YYYY-MM-DD HH:mm"
        photo: photoUrl || undefined, // kirim undefined kalau kosong
        mechanic: formData.mechanic,
        machineCode: formData.machineCode,
        location: formData.location,
        status: mapStatusToApi(formData.status),
        notes: formData.notes || undefined,
      };

      // Simpan juga ke preview JSON
      const jsonData = JSON.stringify(payload, null, 2);
      setJsonResult(jsonData);
      console.log("Payload createReport:", jsonData);

      // 3) Kirim ke backend
      const resultReport = await createReport(payload); // <= KIRIM OBJECT, bukan string
      if (resultReport?.success) {
        console.log("✅ sukses", resultReport);
        // Reset form
        setFormData(
          columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {})
        );
        setFile(null);
      } else {
        console.error("❌ error createReport", resultReport);
        alert(resultReport?.error || "Gagal menyimpan laporan");
      }
    } catch (err) {
      console.error("❌ Submit error:", err);
      alert(err.message || "Gagal submit");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (!jsonResult) return;
    const blob = new Blob([jsonResult], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const inputType = (key) => {
    if (key === "datetime") return "datetime-local";
    if (key === "photo") return "url"; // tetap URL manual (opsional)
    return "text";
  };

  return (
    <>
      <form className="df" onSubmit={handleSubmit} noValidate>
        <div className="df__header">
          <h2 className="df__title">Add Maintenance Record</h2>
          <p className="df__subtitle">Isi data sesuai kolom tabel</p>
        </div>

        <div className="df__grid">
          {columns.map((col) => (
            <div className="df__field" key={col.key}>
              <label className="df__label" htmlFor={col.key}>
                {col.label}
              </label>

              {col.key === "datetime" ? (
                <DateTimeField
                  value={formData.datetime}
                  onChange={(val) =>
                    setFormData((s) => ({ ...s, datetime: val }))
                  }
                />
              ) : col.key === "status" ? (
                <select
                  id={col.key}
                  name={col.key}
                  className="df__control"
                  value={formData[col.key]}
                  onChange={handleChange}
                >
                  <option value="">-- Select status --</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Waiting Parts">Waiting Parts</option>
                </select>
              ) : col.key === "notes" ? (
                <textarea
                  id={col.key}
                  name={col.key}
                  className="df__control df__control--textarea"
                  rows={4}
                  placeholder="Catatan tambahan..."
                  value={formData[col.key]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  id={col.key}
                  name={col.key}
                  className="df__control"
                  type={inputType(col.key)}
                  placeholder={
                    col.key === "photo"
                      ? "https://example.com/image.jpg (opsional)"
                      : ""
                  }
                  value={formData[col.key]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}

          {/* Input FILE terpisah untuk upload foto */}
          <div className="df__field">
            <label className="df__label" htmlFor="photoFile">
              Photo (Upload File)
            </label>
            <input
              id="photoFile"
              name="photoFile"
              className="df__control"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
            />
            <small>
              Kamu bisa isi salah satu: <b>URL</b> di field Photo atau{" "}
              <b>Upload File</b> ini. Jika keduanya diisi, yang dipakai{" "}
              <b>file upload</b>.
            </small>
          </div>
        </div>

        <div className="df__footer">
          <button
            type="submit"
            className="df__btn df__btn--primary"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "SUBMIT"}
          </button>
          <button
            type="button"
            className="df__btn df__btn--ghost"
            onClick={() => {
              setFormData(
                columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {})
              );
              setFile(null);
              setJsonResult(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>

      {jsonResult && (
        <div className="df__json-output">
          <h3>Generated JSON:</h3>
          <pre>{jsonResult}</pre>
          <button onClick={handleDownload} className="df__btn df__btn--primary">
            Download JSON
          </button>
        </div>
      )}
    </>
  );
}
