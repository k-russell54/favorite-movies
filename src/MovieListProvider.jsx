import { createContext, useContext, useReducer, useState } from "react";

export const MovieListContext = createContext(null);

export function useMovies() {
  return useContext(MovieListContext);
}

const initialMovies = [
  { id: 1, name: "Love Actually" },
  { id: 2, name: "Before Sunrise" },
  { id: 3, name: "Interstellar" },
  { id: 4, name: "Lord of the Rings" },
];

function movieListReducer(movieList, action) {
  switch (action.type) {
    case "ADD":
      return [...movieList, { name: action.name, id: Date.now() }];

    case "DELETE":
      return movieList.filter((movie) => movie.id !== action.id);

    case "CLEAR":
      return [];

    default:
      return movieList;
  }
}

export default function MovieListProvider({ children }) {
  const [movieList, dispatch] = useReducer(movieListReducer, initialMovies);

  const [modalIsActive, setModalIsActive] = useState(false);

  const [newMovie, setNewMovie] = useState("");

  return (
    <MovieListContext.Provider
      value={{
        movieList,
        dispatch,
        modalIsActive,
        setModalIsActive,
        newMovie,
        setNewMovie,
      }}
    >
      {children}
    </MovieListContext.Provider>
  );
}
