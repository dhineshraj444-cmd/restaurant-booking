import React from 'react';
import "../App.css";

function Settings({ hotelName, setHotelName, setActivePage }) {
  return (
    <div className="settings-page">
      <button 
        onClick={() => setActivePage("dashboard")} 
        className="delete-btn" 
        style={{ marginBottom: '20px', width: 'auto', background: '#f1f5f9', color: '#1e293b' }}
      >
        ⬅ Back to Dashboard
      </button>

      <h2 className="page-title">Settings</h2>

      <div className="table-details-card" style={{ textAlign: 'left', width: '100%', maxWidth: '500px', margin: '0' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Hotel Name</label>
        <input
          type="text"
          value={hotelName}
          onChange={(e) => setHotelName(e.target.value)}
          placeholder="Enter hotel name"
        />
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        </p>
      </div>
    </div>
  );
}

// 🔴 ITHU THAAN ROMBA MUKKIYAM - Intha line-ah check pannunga
export default Settings;