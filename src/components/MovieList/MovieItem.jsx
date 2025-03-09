import './styles/MovieItem.css';

export default function MovieItem({ movie, index, onDelete }) {
    return (
        <>
            <div className="movieItemBox">
                <p className="movieHeader">Movie
                <button
                    className="deleteBtn"
                    onClick={() => onDelete(movie.id)}
                    >
                    X
                </button>
                </p>
                <p className="movieTitle">
                    {index}. {movie.name}
                </p>
                <li className='movieName'>
                    <p className='genreItem'>Genre: {movie.genre}</p>
                </li>
            </div>
        </>
    )
}