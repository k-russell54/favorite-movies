import "./MovieModal.css";
import AddMovieModal from "./AddMovieModal";
import ModalCloseButton from "./ModalCloseButton";
import { useEffect } from "react";
import { useMovies } from "../../MovieListProvider";

export default function ModalWindow() {
  const { setModalIsActive, setNewMovie } = useMovies();

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setModalIsActive(false);
        setNewMovie("");
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setModalIsActive]);

  return (
    <>
      <div className="modalWrapper">
        <div className="inner">
          <AddMovieModal />
          <ModalCloseButton />
        </div>
      </div>
    </>
  );
}
