import "./styles/ModalCloseButton.css";

export default function ModalCloseButton({ onClick }) {

  return (
    <button
      onClick={onClick}
      className="close"
    >
      X
    </button>
  );
}
