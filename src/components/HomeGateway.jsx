// components/HomeGateway.jsx
import { useNavigate } from "react-router-dom";
import About from "./About"; // 👈 About component-ah import pannunga

const HomeGateway = ({ hotelName }) => {
  const navigate = useNavigate();
  
  return (
    <div className="gateway-main-wrapper">
      {/* 🏠 Main Hero Section */}
      <div className="gateway-hero">
        <div className="hero-overlay">
          <div className="gateway-card">
            <header className="gateway-header">
              <h1>{hotelName}</h1>
              <p>Premium Table Reservation System</p>
            </header>
            <nav className="gateway-nav">
              <ul className="gate-list">
                <li className="gate-item" onClick={() => navigate("/book")}>
                  <div className="gate-icon">🍽️</div>
                  <div className="gate-text">
                    <span>Customer Portal</span>
                    <small>Book your table for a fine dining experience</small>
                  </div>
                  <div className="gate-arrow">➜</div>
                </li>
                <li className="gate-item" onClick={() => navigate("/login")}>
                  <div className="gate-icon">🔐</div>
                  <div className="gate-text">
                    <span>Admin Access</span>
                    <small>Click to login to dashboard</small>
                  </div>
                  <div className="gate-arrow">➜</div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* ✨ New About Us Section Added Below Hero */}
      <div className="home-about-container">
        <About hotelName={hotelName} />
      </div>

      {/* 📝 Simple Footer */}
      <footer style={{ textAlign: 'center', padding: '20px', color: '#888', background: '#0a0a0a' }}>
        <p>© 2026 {hotelName}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeGateway;