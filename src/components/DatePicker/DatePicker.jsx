import React, { useMemo } from "react";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import { id as localeId } from "date-fns/locale"; // locale Indonesia
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimeField.scss";

/**
 * Reusable date-time input
 * Props:
 * - value: string | Date (format "yyyy-MM-dd HH:mm" atau Date)
 * - onChange: (string) => void  // akan mengembalikan "yyyy-MM-dd HH:mm"
 * - minDate, maxDate: Date (opsional)
 * - placeholder: string (opsional)
 * - disabled: boolean (opsional)
 * - className: string (opsional)
 */
export default function DateTimeField({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Pilih tanggal & jam",
  disabled = false,
  className = "",
}) {
  const selected = useMemo(() => {
    if (value instanceof Date) return value;
    if (typeof value === "string" && value.trim()) {
      // coba parse "yyyy-MM-dd HH:mm"
      const parsed = parse(value, "yyyy-MM-dd HH:mm", new Date());
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  }, [value]);

  const handleChange = (date) => {
    if (!date || isNaN(date)) {
      onChange?.("");
      return;
    }
    const out = format(date, "yyyy-MM-dd HH:mm");
    onChange?.(out);
  };

  return (
    <div className={`dtf ${className}`}>
      <DatePicker
        selected={selected}
        onChange={handleChange}
        showTimeSelect
        timeIntervals={5}
        dateFormat="dd MMM yyyy HH:mm"
        placeholderText={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        locale={localeId}
        className="dtf__input"
        calendarClassName="dtf__calendar"
        popperClassName="dtf__popper"
        isClearable
      />
    </div>
  );
}
