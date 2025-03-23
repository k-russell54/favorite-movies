import './styles/StreamingItem.css';
import DeleteButton from './DeleteButton';
import StreamingPoster from './StreamingPoster';
import StreamingDetails from './StreamingDetails';

export default function StreamingItem({ streamingItem, onDelete }) {
    return (
        <div className="streamingItemBox">
            <DeleteButton onDelete={() => onDelete(streamingItem.id)} />
            <StreamingPoster 
                poster={streamingItem.poster}
                title={streamingItem.title}
            />
            <StreamingDetails 
                name={streamingItem.name}
                mediaType={streamingItem.mediaType}
                genres={streamingItem.genres}
                user={streamingItem.user}
                comment={streamingItem.comment}
                providers={streamingItem.providers}
            />
        </div>
    );
}
