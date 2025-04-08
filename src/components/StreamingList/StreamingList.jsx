import { useStreaming } from "../context/StreamingProvider";
import StreamingItem from "./StreamingItem";
import { useFilters } from "../context/FiltersProvider";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./styles/StreamingList.css"; 
import "../../styles.css";
import Loader from "../Loader";

export default function StreamingList() {
  const { streamingList, dispatch, isLoading } = useStreaming();
  
  const { 
    selectedBrowseBy, 
    selectedGenre, 
    selectedUser, 
    selectedService, 
    initialServiceList 
  } = useFilters();


  async function handleDelete(id) {
    if(confirm('Are you sure you want to delete this item?')) {
      try {
        // Remove from Firestore
        await deleteDoc(doc(db, "streamingItems", id));
    
        // Then update local state
        dispatch({ type: "DELETE", id });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  }

  if (isLoading) {
    return (
      <div className="streamingListBox container">
        <Loader />
      </div>
    );
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
        ? item.providers?.some(provider => !initialServiceList.includes(provider.name))
        : item.providers?.some(provider => provider.name === selectedService)
      )

    return matchesMediaType && matchesGenre && matchesUser && matchesService;
  });

  return (

    <div className="streamingListBox container">
      <ul>
        {filteredList.length > 0 ? (
          filteredList.map((streamingItem) => (
            <li key={streamingItem.id}>
              <StreamingItem
                streamingItem={streamingItem}
                onDelete={handleDelete}
              />
            </li>
          ))
        ) : (
          <p className="noResults">No streaming items to show!</p>
        )}
      </ul>
    </div>
  );
}
