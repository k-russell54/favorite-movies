import "./styles/StreamingDetails.css";

export default function StreamingDetails({ name, mediaType, genres, user, comment, providers }) {
    
    
    return (
        <div className="streamingDetailsContainer">
            <h2 className="streamingTitle">{name}</h2>
            
            <h3 className="streamingType">{mediaType === "movie" ? "🎬 Movie On:" : mediaType === "tv" ? "📺 TV Show On:" : "Unknown"}</h3>

            {providers && providers.length > 0 && (
                <div className="providerLogos">
                    {providers.map((provider) => (
                        <img
                        key={provider.id}
                        src={provider.logo}
                        alt={provider.name}
                        title={provider.name}
                        className="providerLogo"
                        />
                    ))}
                </div>
            )}

            {(genres || []).length > 0 && (
                <p className="streamingGenres"><strong>Genres:</strong> {genres.join(", ")} </p>)}

            <div className="userInfoBox">
                <p className="addedBy"><strong>Added By:</strong> <span className="userName">{user}</span></p>
                <p><strong>{`${user}'s Comments: `}</strong><span className="userComments">{comment}</span></p>
            </div>
    </div>
    
    )
}