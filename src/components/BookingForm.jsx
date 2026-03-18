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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(); // UI navigation only
  };

  return (
    <div className="card">
      <h3>Book a Table</h3>

      <form onSubmit={handleSubmit}>
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />

        <select name="guests" onChange={handleChange} required>
          <option value="">Guests</option>
          <option>2</option>
          <option>4</option>
          <option>6</option>
        </select>

        <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />

        <button>Book Table</button>
      </form>
    </div>
  );
}

export default BookingForm;