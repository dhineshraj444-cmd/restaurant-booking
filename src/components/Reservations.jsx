import React from 'react';
import "../App.css";

function Reservations({ reservations = [], setReservations }) {
  
  // 🛠️ DELETE Logic
  const handleDelete = async (id, tableNumber) => {
    if (!id) {
      alert("Error: Reservation ID missing!");
      return;
    }

    if (!window.confirm(`Checkout Table ${tableNumber}?`)) return;

    try {
      const API = "https://sunny-sparkle-production-af43.up.railway.app";

      const res = await fetch(`${API}/reserve/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updatedReservations = reservations.filter((r) => r.id !== id);
        setReservations(updatedReservations);
        alert("✅ Checked out Successfully!");
      } else {
        alert("❌ Fail to checkout.");
      }
    } catch (err) {
      alert("❌ Server is not reachable.");
    }
  };

  // 🚀 SORTING Logic
  const sortedData = [...reservations].sort((a, b) => {
    const dateA = new Date(a.booking_date);
    const dateB = new Date(b.booking_date);
    if (dateA - dateB !== 0) return dateA - dateB;

    const timeToMinutes = (timeStr) => {
      if (!timeStr) return 0;
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);
      if (hours === 12) hours = 0;
      if (modifier === "PM") hours += 12;
      return hours * 60 + minutes;
    };

    return timeToMinutes(a.booking_time) - timeToMinutes(b.booking_time);
  });

  return (
    <div className="reservations-page">
      <div className="reservation-header">
        <h2 className="page-title">Live Reservations 📋</h2>
      </div>

      {/* Safety check: data irukka nu paakurom */}
      {!sortedData || sortedData.length === 0 ? (
        <div className="empty-state">
          <p>There are no bookings available!</p>
        </div>
      ) : (
        <div className="reservation-container">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Table</th>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((r) => {
                let displayDate = r.booking_date;
                try {
                  displayDate = new Date(r.booking_date).toLocaleDateString("en-CA");
                } catch (e) {
                  displayDate = String(r.booking_date).split("T")[0];
                }

                return (
                  <tr key={r.id || Math.random()}>
                    <td className="table-id">Table {r.table_number}</td>
                    
                    {/* 🛠️ Safe mapping: keys mismatch aanaalum idhu display pannum */}
                    <td>{r.customer_name || r.name || "N/A"}</td>
                    <td>{r.phone_number || r.mobile || "N/A"}</td>
                    
                    <td className="date-cell">{displayDate}</td>
                    <td className="time-cell">{r.booking_time}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(r.id, r.table_number)}
                      >
                        CHECKOUT
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Reservations;