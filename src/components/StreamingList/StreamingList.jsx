import { useStreaming } from "../context/StreamingProvider";
import StreamingItem from "./StreamingItem";
import { useFilters } from "../context/FiltersProvider";
import "./styles/StreamingList.css"; 
import "../../styles.css";

export default function StreamingList() {
  const { streamingList, dispatch } = useStreaming();
  const { selectedBrowseBy, selectedGenre, selectedUser, selectedService, initialServiceList } = useFilters();


  function handleDelete(id) {
    dispatch({ type: "DELETE", id });
  } 

  const filteredList = streamingList.filter((item) => {
    const matchesMediaType =
    selectedBrowseBy === "Browse All" ||
    (selectedBrowseBy === "Movies" && item.mediaType === "movie") ||
    (selectedBrowseBy === "TV Shows" && item.mediaType === "tv");
  
    const matchesGenre = selectedGenre === "All Genres" || item.genres.includes(selectedGenre);

    const matchesUser = selectedUser === "All Users" || item.user === selectedUser;

    const matchesService =
      selectedService === "All Services" ||
      (selectedService === 'Other'
        ? item.providers?.every(provider => !initialServiceList.includes(provider.name))
        : item.providers?.some(provider => provider.name === selectedService)
      )

    return matchesMediaType && matchesGenre && matchesUser && matchesService;
  });

  return (
    <div className="streamingListBox container">
      <ul>
        {filteredList.length > 0 ? (
          filteredList.map((streamingItem) => (
            <StreamingItem 
              key={streamingItem.id} 
              streamingItem={streamingItem} 
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="noResults">No streaming items to show!</p>
        )}
      </ul>
    </div>
  );
}
