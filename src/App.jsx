import "./styles.css";
import MovieList from "./components/MovieList/MovieList";
import MovieListProvider from "./components/context/MovieListProvider";
import MovieListWrapper from "./components/modals/MovieListWrapper";

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
