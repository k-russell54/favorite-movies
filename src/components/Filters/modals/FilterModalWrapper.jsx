import ModalWindow from "../../modals/ModalWindow";
import FilterModal from "./FilterModal";
import { useEffect } from "react";

export default function FilterModalWrapper({ closeModal }) {

    useEffect(() => {
        function handleKeyDown(e) {
            if(e.key === 'Escape') {
                closeModal();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);


    }, [closeModal])

    return (
        <ModalWindow onClose={closeModal}>
            <FilterModal closeModal={closeModal}/>
        </ModalWindow>
    );
}