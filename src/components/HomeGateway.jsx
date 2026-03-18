// components/HomeGateway.jsx
import { useNavigate } from "react-router-dom";

const HomeGateway = ({ hotelName }) => {
  const navigate = useNavigate();
  return (
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
  );
};

export default HomeGateway;