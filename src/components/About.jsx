import "../App.css";

function About({ hotelName }) {
  return (
    <div className="main-content" style={{ animation: "popIn 0.4s ease" }}>
      <h2 className="page-title">About Us ℹ️</h2>
      
      <div className="table-details-card" style={{ width: "100%", maxWidth: "800px", textAlign: "left", padding: "40px" }}>
        <h3 style={{ color: "#e63946", fontSize: "28px", marginBottom: "15px" }}>
          Welcome to {hotelName}
        </h3>
        
        <p style={{ color: "#4b5563", fontSize: "16px", lineHeight: "1.8", marginBottom: "25px" }}>
          We are dedicated to providing an unforgettable dining experience. 
          Our newly upgraded smart reservation system ensures that you get your favorite 
          table booked seamlessly, without any waiting time. Enjoy world-class hospitality, 
          delicious food, and a wonderful ambiance with us.
        </p>

        <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", borderLeft: "5px solid #e63946" }}>
          <h4 style={{ marginBottom: "15px", color: "#1f2937", fontSize: "18px" }}>Contact Details</h4>
          <p style={{ margin: "8px 0", color: "#4b5563" }}><strong>📍 Location:</strong> Salem, Tamil Nadu, India</p>
          <p style={{ margin: "8px 0", color: "#4b5563" }}><strong>📞 Phone:</strong> +91 6383467678</p>
          <p style={{ margin: "8px 0", color: "#4b5563" }}><strong>📧 Email:</strong> contact@{hotelName.replace(/\s+/g, '').toLowerCase()}.com</p>
          <p style={{ margin: "8px 0", color: "#4b5563" }}><strong>🕒 Timings:</strong> 09:00 AM - 9:30 PM (Everyday)</p>
        </div>
      </div>
    </div>
  );
}

export default About;