// components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setActivePage }) => {
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setActivePage("dashboard");
      setAdminUser("");
      setAdminPass("");
      navigate("/admin");
    } else { 
      alert("Invalid Username or Password bro!"); 
    }
  };

  return (
    <div className="gateway-hero">
      <div className="hero-overlay">
        <div className="gateway-card" style={{maxWidth: '400px'}}>
          <header className="gateway-header">
            <h1>Admin Login</h1>
            <p>Enter your credentials</p>
          </header>
          
          <form onSubmit={handleLogin} style={{padding: '20px'}}>
            <input 
              type="text" 
              placeholder="Username" 
              value={adminUser} 
              onChange={(e) => setAdminUser(e.target.value)} 
              required 
              style={{width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd'}}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={adminPass} 
              onChange={(e) => setAdminPass(e.target.value)} 
              required 
              style={{width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ddd'}}
            />
            <button type="submit" style={{width: '100%', padding: '12px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
              LOGIN
            </button>
          </form>
          
          <button onClick={() => navigate("/")} style={{marginTop: '15px', background: 'none', border: 'none', color: '#666', cursor: 'pointer'}}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;