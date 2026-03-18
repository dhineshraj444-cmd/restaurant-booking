// components/Tables.jsx
import React from 'react';

const Tables = ({ tables, onSelectTable }) => {
  return (
    <div className="tables-section">
      <h2 className="section-title">Select a Table</h2>
      <div className="tables-grid">
        {tables.map((table) => (
          <div
            key={table.number}
            className={`table-card ${table.status === "Available" ? "available" : "occupied"}`}
            onClick={() => onSelectTable(table)}
          >
            <div className="table-number">Table {table.number}</div>
            <div className="table-seats">{table.seats} Seats</div>
            <div className={`table-status ${table.status === "Available" ? "status-available" : "status-occupied"}`}>
              {table.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;