import { createContext, useContext, useState, useEffect } from "react";
import { useStreaming } from "./StreamingProvider";

export const FiltersContext = createContext(null);

export function useFilters() {
  return useContext(FiltersContext);
}

//Initial Filter lists
const initialGenreList = ["All Genres", "Action", "Adventure", "Animation", "Comedy", "Drama", "Family", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller"]
const initialBrowseByList = ['Browse All', 'Movies', 'TV Shows'];
const initialServiceList = ['All Services', 'Amazon Prime Video', 'Apple TV+', "Disney Plus", "Max", 'Hulu', 'Netflix', 'YouTube', 'Other'];
const initialUserList = ['All Users'];
const initialRatingsList = ["All Ratings", "<50%", "50-60%", "61-70%", "71-80%", "81-90%", "91-100%"];


export default function FiltersProvider({ children }) {
  const { streamingList } = useStreaming();

  const [selectedGenre, setSelectedGenre] = useState("All Genres"); 
  const [selectedBrowseBy, setSelectedBrowseBy] = useState("Browse All");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedUser, setSelectedUser] = useState('All Users');
  const [selectedRating, setSelectedRating] = useState("All Ratings");

  const [updatedUserList, setUpdatedUserList] = useState(initialUserList);


  useEffect(() => {
    const uniqueUsers = Array.from(new Set(
      streamingList.map(item => item.user).filter(Boolean)
    )).sort();
  
    setUpdatedUserList(["All Users", ...uniqueUsers]);
  }, [streamingList]);
  

  return (
    <FiltersContext.Provider
      value={{
        selectedGenre, setSelectedGenre,
        selectedBrowseBy, setSelectedBrowseBy,
        initialGenreList, initialBrowseByList,
        selectedService, setSelectedService,
        initialUserList, selectedUser,
        setSelectedUser,
        initialServiceList, initialRatingsList,
        selectedRating, setSelectedRating,
        updatedUserList, setUpdatedUserList
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
