import { useMovies } from "../context/MovieListProvider";
import MovieListHeader from "./MovieListHeader";
import MovieItem from "./MovieItem";
import MovieControls from "./MovieControls";
import MovieGenres from "./MovieGenres";
import "../../styles.css";

export default function MovieList() {
  const { movieList, selectedGenre, dispatch, setModalIsActive } = useMovies();

  function handleDelete(id) {
    dispatch({ type: "DELETE", id: id });
  }

  function handleClear() {
    dispatch({ type: "CLEAR" });
  }

  const filteredMovies = selectedGenre === 'All Movies'
    ? movieList
    : movieList.filter((movie) => movie.genre === selectedGenre);

  return (
    <>
      <MovieListHeader />
      <MovieGenres />
      <div className="movieListBox">
        <ul>
          {filteredMovies.length > 0 
          ? filteredMovies.map((movie, index) => (
            <MovieItem 
              key={movie.id}
              movie={movie}
              index = {index + 1}
              onDelete={handleDelete} />
          ))
          : (movieList.length === 0 
            ? <p>No movies to show! Try adding one!</p>
            : <p>No movies with that genre!</p>
          )
        }
        </ul>
      </div>
      <MovieControls 
        setModalIsActive={setModalIsActive}
        onClear={handleClear} />
      <div className="clearBox"></div>
    </>
  );
}
