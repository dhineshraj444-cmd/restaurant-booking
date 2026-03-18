function Modal({ close }) {
  return (
    <div className="modal-bg">
      <div className="modal">
        <h3>New Reservation</h3>
        <input placeholder="Name" />
        <input placeholder="Guests" />
        <button>Add</button>
        <button className="close" onClick={close}>Cancel</button>
      </div>
    </div>
  );
}
export default Modal;