"use strict";

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 8080;

// ── Middleware ────────────────────────────────────────────────────────────────

app.use(cors());
app.use(express.json());

// ── Database connection pool ──────────────────────────────────────────────────

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

// Verify the database is reachable at startup (non-fatal — server still starts).
pool.getConnection((err, connection) => {
  if (err) {
    console.error("⚠️  Database connection failed:", err.message);
    console.error("   The server will continue running but DB queries will fail.");
    return;
  }
  console.log("✅ Connected to MySQL database.");
  connection.release();
});

// ── Routes ────────────────────────────────────────────────────────────────────

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Restaurant Booking API is running",
    timestamp: new Date().toISOString(),
  });
});

// GET /reservations — return all reservations ordered by date and time
app.get("/reservations", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM reservations ORDER BY booking_date ASC, booking_time ASC"
    );
    res.json(rows);
  } catch (err) {
    console.error("GET /reservations error:", err.message);
    res.status(500).json({ message: "Failed to fetch reservations", error: err.message });
  }
});

// POST /reserve — create a new reservation
app.post("/reserve", async (req, res) => {
  const { table_number, customer_name, mobile, booking_date, booking_time, guests_count } = req.body;

  if (!table_number || !customer_name || !mobile || !booking_date || !booking_time) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check for an existing booking on the same table, date, and time slot
    const [existing] = await db.query(
      "SELECT id FROM reservations WHERE table_number = ? AND booking_date = ? AND booking_time = ?",
      [table_number, booking_date, booking_time]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "This time slot is already booked for the selected table." });
    }

    const [result] = await db.query(
      `INSERT INTO reservations
         (table_number, customer_name, mobile, booking_date, booking_time, guests_count, payment_status)
       VALUES (?, ?, ?, ?, ?, ?, 'PAID')`,
      [table_number, customer_name, mobile, booking_date, booking_time, guests_count || null]
    );

    res.status(201).json({ message: "Reservation created successfully.", insertId: result.insertId });
  } catch (err) {
    console.error("POST /reserve error:", err.message);
    res.status(500).json({ message: "Failed to create reservation", error: err.message });
  }
});

// DELETE /reserve/:tableNumber/:date — check out / cancel a reservation
app.delete("/reserve/:tableNumber/:date", async (req, res) => {
  const { tableNumber, date } = req.params;

  try {
    const [result] = await db.query(
      "DELETE FROM reservations WHERE table_number = ? AND booking_date = ?",
      [tableNumber, date]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No reservation found for the given table and date." });
    }

    res.json({ message: "Reservation checked out successfully.", affectedRows: result.affectedRows });
  } catch (err) {
    console.error("DELETE /reserve error:", err.message);
    res.status(500).json({ message: "Failed to delete reservation", error: err.message });
  }
});

// ── Start server ──────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
