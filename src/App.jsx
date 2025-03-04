import "./styles.css";
import MovieList from "./components/MovieList.jsx";
import MovieListProvider from "./MovieListProvider.jsx";
import MovieListWrapper from "./components/modals/MovieListWrapper.jsx";

export default function App() {
  return (
    <>
      <MovieListProvider>
        <MovieListWrapper />
        <MovieList />
      </MovieListProvider>
    </>
  );
}
