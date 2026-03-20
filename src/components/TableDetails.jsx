import { useState } from "react";
import "../App.css";

function TableDetails({
  table,
  setReservations,
  reservations = [],
  setActivePage,
}) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(table?.seats || "");

  const timeSlots = [
    "09:30 AM","10:00 AM","10:30 AM","11:00 AM",
    "11:30 AM","12:00 PM","12:30 PM","01:00 PM",
    "01:30 PM","02:00 PM","02:30 PM","03:00 PM",
    "03:30 PM","04:00 PM","04:30 PM","05:00 PM",
    "05:30 PM","06:00 PM","06:30 PM","07:00 PM",
    "07:30 PM","08:00 PM","08:30 PM","09:00 PM"
  ];

  // 🛠️ SAFE LOGIC: App crash aagama irukka try-catch and split use pannirukaen
  const bookedTimesForThisTable = date 
    ? (reservations || [])
        .filter((r) => {
          if (!r || !r.booking_date) return false;

          const isSameTable = String(r.table_number) === String(table?.number);

          let dbDate = "";
          try {
            // Check if it's already a ISO string (YYYY-MM-DD)
            dbDate = String(r.booking_date).split("T")[0];
          } catch (e) {
            dbDate = "";
          }

          return isSameTable && dbDate === date;
        })
        .map((r) => r.booking_time ? String(r.booking_time).trim() : "")
    : [];

  const handleReserve = async () => {
    if (!name || !mobile || !time || !date || !guests) {
      alert("Please fill all details bro! 📝");
      return;
    }

    if (bookedTimesForThisTable.includes(time)) {
      alert("Sorry!, This slot is already booked. Try another slot.");
      return;
    }

    try {
      // 🚀 API URL Fallback
      const API = process.env.REACT_APP_API_URL || "https://sunny-sparkle-production-af43.up.railway.app";

      const res = await fetch(`${API}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_number: table.number,
          customer_name: name,
          mobile: mobile,
          booking_date: date,
          booking_time: time,
          guests_count: parseInt(guests),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // UI State Update
        setReservations([
          ...reservations,
          {
            id: data.insertId,
            table_number: table.number,
            customer_name: name,
            mobile,
            booking_date: date,
            booking_time: time,
            guests_count: guests,
            payment_status: "PAID",
          },
        ]);

        alert(`✅ Table ${table.number} Reserved!`);
        // Refresh and go back to tables
        setActivePage("tables"); 
      } else {
        alert("Booking failed: " + (data.message || "Unknown error"));
      }

    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Server is not connected.");
    }
  };

  return (
    <div className="table-details-wrapper">
      <div className="table-details-card">
        <div className="booking-header">
          <button onClick={() => setActivePage("tables")} className="back-icon-btn"> ⬅ </button>
          <h2>Table {table?.number} Booking</h2>
        </div>

        <p className="subtitle">Confirm your slot for a great dining experience.</p>

        <div className="input-group">
          <label className="input-label">Select Date</label>
          <input
            type="date"
            className="input-field"
            value={date}
            onChange={(e) => { setDate(e.target.value); setTime(""); }}
            min={new Date().toLocaleDateString('en-CA')}
          />

          <label className="input-label">Customer Info</label>
          <input className="input-field" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="input-field" placeholder="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} maxLength="10" />

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label className="input-label">Guests</label>
              <input className="input-field" type="number" value={guests} onChange={(e) => setGuests(e.target.value)} min="1" max={table?.seats + 2} />
            </div>
            <div style={{ flex: 2 }}>
              <label className="input-label">Time Slot</label>
              <select className="input-field" value={time} onChange={(e) => setTime(e.target.value)} disabled={!date}>
                <option value="">{date ? "Select Time" : "First Select Date"}</option>
                {timeSlots.map((t, i) => {
                  const isBooked = bookedTimesForThisTable.includes(t);
                  return (
                    <option key={i} value={t} disabled={isBooked} style={{ color: isBooked ? '#ff4d4d' : 'inherit' }}>
                      {t} {isBooked ? "🔴 (Booked)" : "🟢 (Available)"}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <button className="pay-btn" onClick={handleReserve}>Pay & Reserve</button>
      </div>
    </div>
  );
}

export default TableDetails;