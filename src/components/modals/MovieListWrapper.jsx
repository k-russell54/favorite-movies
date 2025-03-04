import { useMovies } from "../../MovieListProvider";
import ModalWindow from "./ModalWindow";

export default function MovieListWrapper() {
  const { modalIsActive } = useMovies();

  return <>{modalIsActive && <ModalWindow />}</>;
}
