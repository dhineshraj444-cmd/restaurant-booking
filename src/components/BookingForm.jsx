import { useState } from "react";

function BookingForm({ onSuccess }) {
  const [form, setForm] = useState({ date: "", time: "", guests: "", name: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL || "https://sunny-sparkle-production-af43.up.railway.app";

    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name,
          phone_number: form.phone,
          booking_date: form.date,
          booking_time: form.time,
          guests: form.guests,
          table_number: 1 // Dynamic table selection logic can be added here
        }),
      });

      if (response.ok) {
        alert("Booking Successful! 🎉");
        onSuccess();
      } else {
        alert("Server Error! Data not saved.");
      }
    } catch (err) {
      alert("❌ Server is not reachable.");
    }
  };

  return (
    <div className="card">
      <h3>Book a Table</h3>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />
        <select name="guests" onChange={handleChange} required>
          <option value="">Number of Guests</option>
          <option value="2">2 Guests</option>
          <option value="4">4 Guests</option>
          <option value="6">6 Guests</option>
        </select>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Mobile Number" onChange={handleChange} required />
        <button type="submit" className="book-btn">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;