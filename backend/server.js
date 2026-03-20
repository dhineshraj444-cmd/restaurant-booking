require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

// ✅ CORS Settings: Vercel and Localhost allow
app.use(cors({
  origin: ["https://restaurant-booking-teal.vercel.app", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

let db;

/* ✅ DATABASE CONNECTION */
async function initDB() {
  try {
    db = await mysql.createPool({
      host: process.env.MYSQLHOST || process.env.DB_HOST,
      user: process.env.MYSQLUSER || process.env.DB_USER,
      password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
      database: process.env.MYSQLDATABASE || process.env.DB_NAME,
      port: process.env.MYSQLPORT || 3306,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
    });
    console.log("✅ MySQL Connected Successfully");
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1);
  }
}

/* 🧹 CLEAN OLD BOOKINGS (Past dates delete panroom) */
async function cleanOldBookings() {
  if (!db) return;
  try {
    await db.execute("DELETE FROM reservations WHERE booking_date < CURDATE()");
  } catch (err) { console.error("Clean Error:", err); }
}

/* ✅ HEALTH CHECK */
app.get("/", (req, res) => res.send("Server + DB working ✅"));

/* 📥 GET ALL RESERVATIONS (Modified for Today/Upcoming Logic) */
app.get("/reservations", async (req, res) => {
  try {
    await cleanOldBookings();
    
    // Selecting all reservations
    const [rows] = await db.execute(`
      SELECT id, table_number, customer_name, mobile, 
      DATE_FORMAT(booking_date, '%Y-%m-%d') AS booking_date, 
      booking_time 
      FROM reservations 
      ORDER BY booking_date ASC, booking_time ASC
    `);

    // 🔥 Frontend-ku direct array-va anupuroam
    res.json(rows); 
    
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json([]); 
  }
});

/* 💳 CREATE NEW RESERVATION (Directly PAID) */
app.post("/reserve", async (req, res) => {
  try {
    const { table_number, customer_name, mobile, booking_date, booking_time, guests_count } = req.body;
    
    if (!table_number || !customer_name || !mobile || !booking_date || !booking_time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Neenga sonna maari 'PAID' thaan default, vera options kidaiyaathu
    const [result] = await db.execute(
      `INSERT INTO reservations 
      (table_number, customer_name, mobile, booking_date, booking_time, guests, payment_status)
      VALUES (?, ?, ?, ?, ?, ?, 'PAID')`,
      [table_number, customer_name, mobile, booking_date, booking_time, guests_count || 1]
    );

    res.json({ message: "Reservation successful", insertId: result.insertId });
  } catch (err) {
    console.error("Insert Error:", err);
    res.status(500).json({ message: "Insert error" });
  }
});

/* ❌ DELETE RESERVATION */
app.delete("/reserve/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute("DELETE FROM reservations WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ message: "Delete error" });
  }
});

/* 🚀 START SERVER */
async function startServer() {
  await initDB();
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();