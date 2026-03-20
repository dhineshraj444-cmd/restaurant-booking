import React from 'react';
import "../App.css";

function Reservations({ reservations = [], setReservations }) {
  
  // 🛠️ DELETE/CHECKOUT Logic
  const handleDelete = async (tableNumber, bookingTime, rawBookingDate) => {
    let correctDate = rawBookingDate;

    try {
      correctDate = new Date(rawBookingDate).toLocaleDateString('en-CA');
    } catch (e) {
      correctDate = String(rawBookingDate).split("T")[0];
    }

    if (!window.confirm(`Checkout Table ${tableNumber} for ${correctDate}?`)) return;

    try {
      const API = process.env.REACT_APP_API_URL || "https://sunny-sparkle-production-af43.up.railway.app";

      const res = await fetch(
        `${API}/reserve/${tableNumber}/${correctDate}`,
        {
          method: "DELETE",
        }
      );

      let data = {};
      try {
        data = await res.json();
      } catch (e) {}

      if (res.ok) {
        const updatedReservations = reservations.filter(
          (r) =>
            !(
              r.table_number === tableNumber &&
              r.booking_time === bookingTime &&
              r.booking_date === rawBookingDate
            )
        );

        setReservations(updatedReservations);
        alert("✅ Checked out Successfully!");
      } else {
        alert("❌ Fail: " + (data.message || "Record not found"));
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("❌ Server is not reachable.");
    }
  };

  // 🚀 SORTING LOGIC
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

    return (
      timeToMinutes(a.booking_time) -
      timeToMinutes(b.booking_time)
    );
  });

  return (
    <div className="reservations-page">
      <div className="reservation-header">
        <h2 className="page-title">Live Reservations 📋</h2>
        <span className="subtitle">
         
        </span>
      </div>

      {sortedData.length === 0 ? (
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
              {sortedData.map((r, index) => {
                let displayDate = r.booking_date;

                try {
                  displayDate = new Date(r.booking_date).toLocaleDateString("en-CA");
                } catch (e) {
                  displayDate = String(r.booking_date).split("T")[0];
                }

                return (
                  <tr key={index}>
                    <td className="table-id">Table {r.table_number}</td>
                    <td>{r.customer_name}</td>
                    <td>{r.mobile}</td>
                    <td className="date-cell">{displayDate}</td>
                    <td className="time-cell">{r.booking_time}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            r.table_number,
                            r.booking_time,
                            r.booking_date
                          )
                        }
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