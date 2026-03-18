// components/BookingPage.jsx
import { useNavigate } from "react-router-dom";
import Tables from "./Tables";
import TableDetails from "./TableDetails";

const BookingPage = ({ hotelName, tables, setSelectedTable, setActivePage, activePage, selectedTable, setReservations, reservations }) => {
  const navigate = useNavigate();
  return (
    <div className="user-container">
      <header className="user-header">
         <button className="back-icon-btn" onClick={() => navigate("/")} title="Go Back">⬅</button>
         <h1>Welcome to {hotelName}</h1>
      </header>
      <main className="user-main-content">
        <Tables tables={tables} onSelectTable={(table) => { setSelectedTable(table); setActivePage("tableDetails"); }} />
        {activePage === "tableDetails" && selectedTable && (
          <div className="modal-overlay">
             <TableDetails 
                table={selectedTable} 
                setReservations={setReservations} 
                reservations={reservations} 
                setActivePage={setActivePage} 
              />
          </div>
        )}
      </main>
    </div>
  );
};

export default BookingPage;