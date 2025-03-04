import { useMovies } from "../MovieListProvider";
import "../styles.css";

export default function MovieList() {
  const { movieList, dispatch, setModalIsActive } = useMovies();

  function handleDelete(id) {
    dispatch({ type: "DELETE", id: id });
  }

  function handleClear() {
    dispatch({ type: "CLEAR" });
  }

  return (
    <>
      <div className="titleBox">
        <h1>Favorite Movies</h1>
      </div>
      <div className="movieListBox">
        <ul>
          {movieList.map((movie) => (
            <li key={movie.id}>
              {movie.name}
              <button
                className="deleteBtn"
                onClick={() => handleDelete(movie.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="inputArea">
        <button
          className="btn add"
          onClick={() => {
            setModalIsActive(true);
          }}
        >
          Add Movie
        </button>
        <button className="btn clear" onClick={handleClear}>
          Clear Movies
        </button>
      </div>
      <div className="clearBox"></div>
    </>
  );
}
