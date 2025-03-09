import { createContext, useContext, useEffect, useReducer, useState } from "react";

export const MovieListContext = createContext(null);

export function useMovies() {
  return useContext(MovieListContext);
}

const initialMovies = localStorage.getItem('movieList')
? JSON.parse(localStorage.getItem('movieList'))
: [];

const initialMovieGenreList = ['All Movies','Drama', 'Comedy', 'Action', 'Thriller', 'Fantasy'];

const initialState = {
  movieList: initialMovies,
  selectedGenre: 'All Movies'
};

function movieListReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        movieList: [...state.movieList, { name: action.name, id: Date.now(), genre: action.genre }]};

    case "DELETE":
      return {
        ...state,
        movieList: state.movieList.filter((movie) => movie.id !== action.id)};

    case "FILTER":
      return {
        ...state,
       selectedGenre: action.genre
    };

    case "CLEAR":
      return {
        ...state,
        movieList: []
      };

    default:
      return state;
  }
}

export default function MovieListProvider({ children }) {
  const [state, dispatch] = useReducer(movieListReducer, initialState);

  const [movieGenreList, setMovieGenreList] = useState(initialMovieGenreList);

  const [chosenGenre, setChosenGenre] = useState("");

  const [modalIsActive, setModalIsActive] = useState(false);

  const [newMovie, setNewMovie] = useState("");

  useEffect(() => {
    localStorage.setItem('movieList', JSON.stringify(state.movieList))
  }, [state.movieList]);

  return (
    <MovieListContext.Provider
      value={{
        movieList: state.movieList,
        selectedGenre: state.selectedGenre,
        dispatch,
        movieGenreList, 
        setMovieGenreList,
        chosenGenre, 
        setChosenGenre,
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
