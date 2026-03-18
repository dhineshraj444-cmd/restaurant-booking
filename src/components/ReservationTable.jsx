import { useState } from "react";
import Modal from "./Modal";

function ReservationTable() {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const data = [
    { time: "08:00 AM", name: "Emily", guests: 4 },
    { time: "09:00 AM", name: "Justin", guests: 2 },
    { time: "10:00 AM", name: "Sophia", guests: 5 }
  ];

  const filtered = data.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.time.includes(search)
  );

  return (
    <>
      <input
        className="search"
        placeholder="Search by name or time"
        onChange={e => setSearch(e.target.value)}
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
          {filtered.map((r, i) => (
            <tr key={i}>
              <td>{r.time}</td>
              <td>{r.name}</td>
              <td>{r.guests}</td>
              <td>
                <button onClick={() => setShow(true)}>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {show && <Modal close={() => setShow(false)} />}
    </>
  );
}

export default ReservationTable;