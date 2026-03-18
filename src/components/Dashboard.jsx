import React from 'react';
import "../App.css";

function Dashboard({ reservations, hotelName, onOpenSettings }) {
  // Count calculations
  const confirmedCount = reservations.filter(res => res.status === "Confirmed").length;
  const waitlistCount = reservations.filter(res => res.status === "Waitlist").length;

  return (
    <div className="dashboard">
      {/* Settings Button - Dashboard la visible */}
      <button onClick={onOpenSettings} className="settings-btn">
        ⚙️ Settings
      </button>

      <div className="dashboard-header">
        <h2>{hotelName}</h2>
        <p>Admin Dashboard Overview</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>TOTAL RESERVATIONS</h3>
          <p>{reservations.length}</p>
        </div>
        <div className="stat-card">
          <h3>CONFIRMED</h3>
          <p>{confirmedCount}</p>
        </div>
        <div className="stat-card">
          <h3>WAITLIST</h3>
          <p>{waitlistCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;