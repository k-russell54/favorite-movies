import { useMovies } from "../../MovieListProvider";

export default function ModalCloseButton() {
  const { setModalIsActive } = useMovies();

  return (
    <>
      <button
        onClick={() => {
          setModalIsActive(false);
        }}
        className="deleteBtn close"
      >
        X
      </button>
    </>
  );
}
