import "./styles/StreamingPoster.css";

export default function StreamingPoster({ poster, title }) {
    return (
        poster ? (
            <img 
                src={poster} 
                alt={`${title} Poster`} 
                className="streamingPoster"
            />
        ) : null
    );
}