import "../App.css";

function Admin() {
  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>🍽 Admin</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Reservations</li>
          <li>Tables</li>
          <li>Settings</li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* TOP BAR */}
        <div className="top-row">
          <h2>Restaurant Reservation System</h2>
          <input className="top-search" placeholder="Search..." />
        </div>

        {/* STATUS CARDS */}
        <div className="cards-row">
          <div className="status-card red">
            All <span>20</span>
          </div>
          <div className="status-card green">
            Confirmed <span>14</span>
          </div>
          <div className="status-card orange">
            Waitlist <span>6</span>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="table-section">
          <input
            className="table-search"
            placeholder="Search by name or time"
          />

          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Name</th>
                <th>Guests</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>08:00 AM</td>
                <td>Emily</td>
                <td>4</td>
                <td><button className="add-btn">+</button></td>
              </tr>
              <tr>
                <td>09:00 AM</td>
                <td>Justin</td>
                <td>2</td>
                <td><button className="add-btn">+</button></td>
              </tr>
              <tr>
                <td>10:00 AM</td>
                <td>Sophia</td>
                <td>5</td>
                <td><button className="add-btn">+</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

export default Admin;