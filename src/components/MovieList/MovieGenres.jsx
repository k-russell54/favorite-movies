import { useMovies } from '../context/MovieListProvider';
import { useEffect, useState } from 'react';
import './styles/MovieGenres.css'

export default function MovieGenres() {
    const { dispatch, selectedGenre, movieGenreList } = useMovies(); 
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 760);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    function handleFilter(genre) {
        dispatch({ type: 'FILTER', genre: genre})
    }

    return (
        <>
            <h3>Sort Your Movies By Genre:</h3>
            
            {isMobile ? (
                <div className="selectContainer">
                    <select
                        className='genreDropdown'
                        value={selectedGenre}
                        onChange={(e) => handleFilter(e.target.value)}
                    >
                        {movieGenreList.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="genreBox">
                {movieGenreList.map((genre => (
                    <p 
                        key={genre}
                        className={`btn genre ${selectedGenre === genre ? "selected" : ""}`}
                        onClick={() => handleFilter(genre)}>
                    {genre}
                    </p>
                )))}
                </div>
            )}
        </>
    );
}