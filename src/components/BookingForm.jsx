import { useState } from "react";

function BookingForm({ onSuccess }) {
  const [form, setForm] = useState({
    date: "",
    time: "",
    guests: "",
    name: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚀 Backend URL Fallback
    const API_URL = process.env.REACT_APP_API_URL || "https://sunny-sparkle-production-af43.up.railway.app";

    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name, // ⚠️ Backend column name kooda match aaganum
          phone_number: form.phone,
          booking_date: form.date,
          booking_time: form.time,
          guests: form.guests,
          table_number: 1 // Default-ah oru table number kuduthukkalam
        }),
      });

      if (response.ok) {
        alert("Booking Successful! 🎉");
        onSuccess(); // Success aana mattum vera page-ku poga
      } else {
        alert("Server error! Please try again.");
      }
    } catch (err) {
      console.error("Booking Error:", err);
      alert("Server is not connected.");
    }
  };

  return (
    <div className="card">
      <h3>Book a Table</h3>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />

        <select name="guests" onChange={handleChange} required>
          <option value="">Guests</option>
          <option value="2">2</option>
          <option value="4">4</option>
          <option value="6">6</option>
        </select>

        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />

        <button type="submit">Book Table</button>
      </form>
    </div>
  );
}

export default BookingForm;