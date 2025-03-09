import { useState } from "react";
import { useMovies } from "../context/MovieListProvider";

export default function AddMovieModal() {
  const { dispatch, setModalIsActive, newMovie, setNewMovie, movieGenreList, chosenGenre, setChosenGenre } = useMovies();

  function handleAdd() {
    if(!newMovie.trim() || !chosenGenre) {
      alert("Please fill out both fields!")
      return
  } 
    dispatch({ type: "ADD", name: newMovie, genre: chosenGenre });
    setNewMovie("");
    setChosenGenre("");
    setModalIsActive(false);
  }

function handleKeyDown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleAdd();
  }
}

  return (
    <>
      <div className="form" onKeyDown={handleKeyDown}>
        <h2>Add a New Movie</h2>
        <label className="labelText">Movie Name: </label>
        <input
          placeholder="Enter a movie..."
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
        />
        <br />
        <label className="labelText">Movie Genre: </label>
        <select
          value={chosenGenre}
          onChange={(e) => setChosenGenre(e.target.value)}
        >
          <option value="" disabled>Select a genre</option>
          {movieGenreList.slice(1).map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <br />
        <button className="btn add" onClick={handleAdd}>
          Add Movie
        </button>
      </div>
    </>
  );
}
