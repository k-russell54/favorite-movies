import { useUI } from "../context/UIProvider";
import ModalWindow from "./ModalWindow";
import AddItemModal from "./AddItemModal";

export default function StreamingListWrapper() {
  const { modalIsActive, setModalIsActive } = useUI();

  function closeModal() {
    setModalIsActive(false);
  }

  return (
    <>
      {modalIsActive && (
        <ModalWindow onClose={closeModal}>
          <AddItemModal />
        </ModalWindow>
      )}
    </>
  );
}
