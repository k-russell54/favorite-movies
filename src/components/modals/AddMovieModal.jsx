import { useMovies } from "../../MovieListProvider";

export default function AddMovieModal() {
  const { dispatch, setModalIsActive, newMovie, setNewMovie } = useMovies();

  function handleAdd() {
    if (!newMovie.trim()) {
      window.alert("Please enter a movie title!");
      setNewMovie("");
      return;
    }
    dispatch({ type: "ADD", name: newMovie });
    setNewMovie("");
    setModalIsActive(false);
  }

  return (
    <>
      <div className="form">
        <h2>Add a New Movie</h2>
        <label>Movie Name: </label>
        <input
          placeholder="Enter a movie..."
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <br />
        <button className="btn add" onClick={handleAdd}>
          Add Movie
        </button>
      </div>
    </>
  );
}
