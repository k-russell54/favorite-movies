import "./styles/ModalWindow.css"; 
import ModalCloseButton from "./ModalCloseButton";
import { useEffect } from "react";
import { useStreaming } from "../context/StreamingProvider";
import { useUI } from "../context/UIProvider";

export default function ModalWindow({ children, onClose }) {
  const { setNewStreamingItem } = useStreaming(); 
  const { setModalIsActive } = useUI();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setModalIsActive(false);
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
        <ModalCloseButton onClick={() => {
          setModalIsActive(false);
        }} />
        {children}
      </div>
    </div>
  );
}
