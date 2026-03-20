import React from 'react';
import "../App.css";

function Dashboard({ reservations = [], hotelName, onOpenSettings }) {
  
  // 📅 Inniku date-ah 'YYYY-MM-DD' format-la edukkurom
  const todayDate = new Date().toLocaleDateString("en-CA");

  // 📊 Filter logic: Inniku vara poravanga vs Future-la varavanga
  const todayBookings = reservations.filter(r => r.booking_date === todayDate).length;
  const upcomingBookings = reservations.filter(r => r.booking_date > todayDate).length;
  const totalBookings = reservations.length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="hotel-name">{hotelName} Admin 🏢</h1>
        <div className="header-actions">
          <button className="settings-icon-btn" onClick={onOpenSettings} title="Settings">⚙️ Settings</button>
        </div>
      </div>

      <div className="stats-container">
        {/* Card 1: Total Reservations */}
        <div className="stat-card">
          <h3>Total Confirmed</h3>
          <p>{totalBookings}</p>
          <small>Total paid bookings in DB</small>
        </div>

        {/* Card 2: Today's Arrivals (Based on Date) */}
        <div className="stat-card" style={{ borderBottom: '4px solid #6366f1' }}>
          <h3>Today's Arrivals 🏃‍♂️</h3>
          <p style={{ color: '#6366f1' }}>{todayBookings}</p>
          <small>Bookings for {todayDate}</small>
        </div>

        {/* Card 3: Upcoming (Future Dates) */}
        <div className="stat-card" style={{ borderBottom: '4px solid #10b981' }}>
          <h3>Upcoming Bookings 🗓️</h3>
          <p style={{ color: '#10b981' }}>{upcomingBookings}</p>
          <small>Scheduled for future dates</small>
        </div>
      </div>

      <div className="dashboard-info" style={{ marginTop: '30px', padding: '20px', background: '#f1f5f9', borderRadius: '15px' }}>
        <p style={{ color: '#475569', fontWeight: '600' }}>
          📢 Note: All reservations are automatically confirmed upon payment.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;