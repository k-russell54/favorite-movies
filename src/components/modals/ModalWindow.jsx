import "./styles/ModalWindow.css"; 
import ModalCloseButton from "./ModalCloseButton";
import { useEffect } from "react";

export default function ModalWindow({ children, onClose }) {

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modalWrapper">
      <div className="inner">
        <ModalCloseButton onClick={onClose} />
        {children}
      </div>
    </div>
  );
}
