import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const StreamingListContext = createContext(null);

export function useStreaming() {
  return useContext(StreamingListContext);
}

const API_KEY = "a72f214656f9a04a19376eea6da71a47";


const initialState = {
  streamingList: []
};

function streamingListReducer(state, action) {
  switch (action.type) {
    case "DELETE":
      return {
        ...state,
        streamingList: state.streamingList.filter((streamingItem) => streamingItem.id !== action.id)
      };

    case "SET_ALL":
      return {
        ...state,
        streamingList: action.payload
      };

    default:
      return state;
  }
}

export default function StreamingProvider({ children }) {
  const [state, dispatch] = useReducer(streamingListReducer, initialState);

  const [newItemName, setNewItemName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [searchedTitles, setSearchedTitles] = useState([]);
  const [selectedMediaType, setSelectedMediaType] = useState("Select Type");
  const [newYearInput, setNewYearInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTitles(title, mediaType, yearInput) {
    if (!title.trim()) return [];
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${mediaType}?query=${encodeURIComponent(title)}${
          yearInput.trim()
            ? mediaType === "movie"
              ? `&year=${yearInput}`
              : `&first_air_date_year=${yearInput}`
            : ""
        }&api_key=${API_KEY}`
      );      
  
      const data = await response.json();
  
      const detailedResults = await Promise.all(
        data.results.map(async (item) => {
          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/${mediaType}/${item.id}?api_key=${API_KEY}`
          );
          const detailsData = await detailsResponse.json();
  
          return {
            id: item.id,
            title: mediaType === "movie" ? item.title : item.name,
            mediaType, 
            poster: item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : "",
            genres: detailsData.genres
              ? detailsData.genres
                  .flatMap((g) => g.name.split(" & ")) 
                  .map((name) => 
                    name === "Science Fiction" ? "Sci-Fi" : name
                  )
                  .slice(0, 2)
            : [],
          };
        })
      );
  
      return detailedResults;
    } catch (error) {
      console.error("Error fetching titles", error);
      return [];
    }
  }
 
  async function fetchStreamingProviders(id, mediaType) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers?api_key=${API_KEY}`
      );
      const data = await response.json();
    
      // Ensure we get results for US (or another region if needed)
      const providers = data.results?.US?.flatrate || data.results?.US?.buy || [];
  
    const seenProviders = new Set();

    const formattedProviders = providers
      .sort((a, b) => a.provider_name.length - b.provider_name.length) // ✅ Prioritize shorter names first
      .filter(provider => {
        const baseName = provider.provider_name
          .replace(/\b(Basic with ads|with ads|Amazon Channel|through Prime Video|via Apple TV|on Spectrum|Spectrum|Apple TV Plus Amazon Channel)\b/gi, '') // ❌ Remove unwanted terms
          .trim();
    
        if (
          !baseName || 
          seenProviders.has(baseName) || 
          /spectrum|Apple TV Plus Amazon Channel/i.test(provider.provider_name) // ❌ Skip if it's Spectrum or Apple TV Plus Amazon Channel
        ) {
          return false; 
        }
          seenProviders.add(baseName);
          return true; // ✅ Keep the first unique provider
        })
        .slice(0, 2)
        .map(provider => ({
          id: provider.provider_id,
          name: provider.provider_name, 
          logo: `https://image.tmdb.org/t/p/w45${provider.logo_path}`,
        }));

  
      console.log("Formatted Providers:", formattedProviders); // ✅ Log formatted providers
  
      return formattedProviders;
    } catch (error) {
      console.error("Error fetching streaming providers:", error);
      return [];
    }
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "streamingItems"), (querySnapshot) => {
      const results = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          name: data.title,
          user: data.user,
          comment: data.comment,
          mediaType: data.mediaType,
          poster: data.poster,
          genres: data.genres || [],
          providers: data.providers || [],
          id: doc.id
        };
      });
  
      dispatch({ type: "SET_ALL", payload: results });
      setIsLoading(false);
    });
  
    // Optional: Clean up subscription when component unmounts
    return () => unsubscribe();
  }, []);
  
  
  

  return (
    <StreamingListContext.Provider
      value={{
        streamingList: state.streamingList,
        dispatch,
        newItemName, setNewItemName,
        newUserName, setNewUserName,
        newComment, setNewComment,
        newYearInput, setNewYearInput,
        searchedTitles, fetchTitles,
        selectedMediaType, setSelectedMediaType,
        fetchStreamingProviders, isLoading
      }}
    >
      {children}
    </StreamingListContext.Provider>
  );
}
