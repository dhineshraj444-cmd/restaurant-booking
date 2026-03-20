import React from 'react';
import "../App.css";

function Dashboard({ reservations = [], hotelName, onOpenSettings }) {
  
  // ✅ FIXED: Using 'payment_status' column and checking for 'PAID'
  // Database-la 'PAID' irundha adhu Confirmed
  const confirmedCount = reservations.filter(res => res.payment_status === "PAID").length;
  
  // Database-la 'PENDING' irundha adhu Waitlist (ippodhiku namma ellame PAID-nu dhaan anupurom)
  const waitlistCount = reservations.filter(res => res.payment_status === "PENDING").length;

  return (
    <div className="dashboard">
      {/* Settings Button */}
      <button onClick={onOpenSettings} className="settings-btn">
        ⚙️ Settings
      </button>

      <div className="dashboard-header">
        {/* Dynamic Hotel Name */}
        <h2>{hotelName || "MAARAN HOTEL"}</h2>
        <p>Admin Dashboard Overview</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>TOTAL RESERVATIONS</h3>
          {/* Total bookings count */}
          <p>{reservations.length}</p>
        </div>
        
        <div className="stat-card">
          <h3>CONFIRMED</h3>
          {/* Number of PAID bookings */}
          <p>{confirmedCount}</p>
        </div>
        
        <div className="stat-card">
          <h3>WAITLIST</h3>
          {/* Number of PENDING bookings */}
          <p>{waitlistCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;