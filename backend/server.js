const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hesoyam@444", 
  database: "restaurant_booking",
});

// 🧹 Auto-Delete Function (Pazhaiya thethi bookings-a delete pannum)
const cleanOldBookings = () => {
  const query = "DELETE FROM reservations WHERE booking_date < CURDATE()";
  db.query(query, (err, result) => {
      if (!err && result.affectedRows > 0) {
          console.log(`🧹 AUTO-CLEAN: Deleted ${result.affectedRows} expired past bookings from database!`);
      }
  });
};

db.connect((err) => {
  if (err) console.log("❌ DB Connection Error:", err);
  else {
    console.log("✅ MySQL Connected");
    // 🚀 Server start aagum pothu automatic-a pazhaiya data-va clean pannidum!
    cleanOldBookings(); 
  }
});

// 📥 Fetch all reservations (Admin page open pannum pothum auto-clean nadakkum)
app.get("/reservations", (req, res) => {
  // 1. Admin paakurathuku munnadi pazhaiya data-va delete pandrom
  cleanOldBookings();

  // 2. Fresh aana data-va mattum eduthu anupurom (Plus, date & time vechu order pandrom)
  const query = "SELECT *, DATE_FORMAT(booking_date, '%Y-%m-%d') AS booking_date FROM reservations ORDER BY booking_date ASC, booking_time ASC";
  
  db.query(query, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// 💳 Reserve table API 
app.post("/reserve", (req, res) => {
  const { table_number, customer_name, mobile, booking_date, booking_time, guests_count } = req.body;

  if (!table_number || !customer_name || !mobile || !booking_date || !booking_time) {
    return res.status(400).json({ message: "Missing fields!" }); 
  }

  const checkSql = "SELECT * FROM reservations WHERE table_number = ? AND booking_date = ? AND booking_time = ?";
  db.query(checkSql, [table_number, booking_date, booking_time], (err, rows) => {
    
    if (err) {
      console.error("Check Query Error:", err);
      return res.status(500).json({ message: "Error checking availability" });
    }

    if (rows && rows.length > 0) {
      return res.status(400).json({ message: "Slot booked!" });
    }

    const insertSql = "INSERT INTO reservations (table_number, customer_name, mobile, booking_date, booking_time, guests, payment_status) VALUES (?, ?, ?, ?, ?, ?, 'PAID')";
    db.query(insertSql, [table_number, customer_name, mobile, booking_date, booking_time, guests_count], (err, result) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).json({ message: "Error saving reservation" });
      }
      console.log(`✅ Table ${table_number} Reserved! Insert ID: ${result.insertId}`);
      
      // 🚀 THE MAGIC FIX: Ippo namma Pudhu ID-a Frontend-ku anupurom!
      res.status(200).json({ message: "Reservation successful", insertId: result.insertId });
    });
  });
});

// ❌ Delete SPECIFIC Reservation by ID
app.delete('/reserve/:id', (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM reservations WHERE id = ?;commit;";
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Delete Error:", err);
            return res.status(500).json({ message: "Error occured in database" });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No matching record found to delete!" });
        }

        console.log(`🗑️ Deleted Reservation ID: ${id}`);
        res.status(200).json({ message: "Booking Deleted Successfully!" });
    });
});

app.listen(5001, () => console.log("🚀 Server running on http://localhost:5001"));