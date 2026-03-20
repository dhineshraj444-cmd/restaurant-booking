import "./App.css";
import { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomeGateway from "./components/HomeGateway";
import Login from "./components/Login";
import BookingPage from "./components/BookingPage";
import Dashboard from "./components/Dashboard";
import Reservations from "./components/Reservations";
import Settings from "./components/Settings";
import About from "./components/About"; 

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [hotelName, setHotelName] = useState(() => localStorage.getItem("hotelName") || "Sri Lakshmi Hotel");
  
  // 🛠️ Safety check for Login status (Boolean conversion)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem("isLoggedIn");
    return saved === "true"; 
  });

  // Direct Railway Backend URL
  const API_URL = "https://sunny-sparkle-production-af43.up.railway.app";

  useEffect(() => { 
    localStorage.setItem("hotelName", hotelName); 
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [hotelName, isLoggedIn]);

  const [tables] = useState([
    { number: 1, seats: 2, status: "Available" }, { number: 2, seats: 2, status: "Available" },
    { number: 3, seats: 4, status: "Available" }, { number: 4, seats: 4, status: "Available" },
    { number: 5, seats: 6, status: "Available" }, { number: 6, seats: 6, status: "Available" },
    { number: 7, seats: 2, status: "Available" }, { number: 8, seats: 2, status: "Available" },
    { number: 9, seats: 4, status: "Available" }, { number: 10, seats: 4, status: "Available" },
    { number: 11, seats: 6, status: "Available" }, { number: 12, seats: 6, status: "Available" },
  ]);

  // 🛠️ Fetch Reservations with Safety Array check
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch(`${API_URL}/reservations`);
        if (res.ok) {
          const data = await res.json();
          // Backend data-va apdiyae set panrom
          setReservations(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setReservations([]); 
      }
    };
    fetchReservations();
  }, [API_URL]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    setActivePage("dashboard");
  };

  return (
    <Router>
      <Routes>
        {/* 🏠 Customer Gateway */}
        <Route path="/" element={<HomeGateway hotelName={hotelName} />} />

        {/* 🔑 Admin Login */}
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/admin" /> : <Login setIsLoggedIn={setIsLoggedIn} setActivePage={setActivePage} />
        } />

        {/* 📅 Customer Booking Page */}
        <Route path="/book" element={
          <BookingPage 
            hotelName={hotelName} 
            tables={tables} 
            setReservations={setReservations} 
            reservations={reservations}
            setSelectedTable={setSelectedTable}
            selectedTable={selectedTable}
            setActivePage={setActivePage}
            activePage={activePage}
          />
        } />

        {/* 👨‍💼 Protected Admin Panel */}
        <Route path="/admin" element={
          isLoggedIn ? (
            <div className="app">
              <aside className="sidebar">
                <h2>🍽 Admin</h2>
                <ul>
                  <li onClick={() => setActivePage("dashboard")} className={activePage === "dashboard" ? "active" : ""}>Dashboard</li>
                  <li onClick={() => setActivePage("reservations")} className={activePage === "reservations" ? "active" : ""}>Reservations</li>
                  <li onClick={() => setActivePage("about")} className={activePage === "about" ? "active" : ""}>About Us</li>
                  <li onClick={handleLogout} style={{marginTop: 'auto', color: '#ff4d4d', cursor: 'pointer', fontWeight: 'bold'}}>Logout</li>
                </ul>
              </aside>
              <main className="main">
                {activePage === "dashboard" && <Dashboard reservations={reservations || []} hotelName={hotelName} onOpenSettings={() => setActivePage("settings")} />}
                {activePage === "reservations" && <Reservations reservations={reservations || []} setReservations={setReservations} />}
                {activePage === "settings" && <Settings hotelName={hotelName} setHotelName={setHotelName} setActivePage={setActivePage} />}
                {activePage === "about" && <About hotelName={hotelName} />}
              </main>
            </div>
          ) : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;