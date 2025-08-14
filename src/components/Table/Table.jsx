import React from "react";
import { Image, ArrowUpDown } from "lucide-react"; // 🔹 Ikon dari lucide-react
import "./Table.scss"

const Table = ({ columns, data, onSort }) => {
    return (
        <table className="custom-table">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key} onClick={() => onSort && onSort(col.key)}>
                            <span className="table-header">
                                {col.label}
                                {/* 🔹 Ikon sort */}
                                {col.sortable && <ArrowUpDown size={16} />}
                            </span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {columns.map((col) => (
                            <td key={col.key}>
                                {col.key === "photo" ? (
                                    <a
                                        href={row[col.key]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="photo-link"
                                    >
                                        <Image size={16} /> Lihat Foto
                                    </a>
                                ) : (
                                    row[col.key]
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
