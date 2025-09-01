import React, { useState } from "react";
import "./Formmechanics.scss";
import DateTimeField from "../../components/DatePicker/DatePicker";
const columns = [
  { key: "datetime", label: "Date & Time", sortable: true },
  { key: "photo", label: "Photo" },
  { key: "mechanic", label: "Mechanic Name", sortable: true },
  { key: "machineCode", label: "Engine Code", sortable: true },
  { key: "location", label: "Location", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "notes", label: "Notes" },
];

export default function Formmechanics() {
  const [formData, setFormData] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {})
  );
  const [jsonResult, setJsonResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jsonData = JSON.stringify(formData, null, 2);
    setJsonResult(jsonData);

    // reset form
    setFormData(columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {}));
  };

  const handleDownload = () => {
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
    if (key === "photo") return "url";
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
                  value={formData.datetime} // "yyyy-MM-dd HH:mm"
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
                    col.key === "photo" ? "https://example.com/image.jpg" : ""
                  }
                  value={formData[col.key]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>

        <div className="df__footer">
          <button type="submit" className="df__btn df__btn--primary">
            Generate JSON
          </button>
          <button
            type="button"
            className="df__btn df__btn--ghost"
            onClick={() =>
              setFormData(
                columns.reduce((acc, col) => ({ ...acc, [col.key]: "" }), {})
              )
            }
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
