import { createContext, useContext, useEffect, useReducer, useState } from "react";

export const StreamingListContext = createContext(null);

export function useStreaming() {
  return useContext(StreamingListContext);
}

const API_KEY = "a72f214656f9a04a19376eea6da71a47";

const initialItems = (() => {
  try {
    return JSON.parse(localStorage.getItem("streamingList")) || [];
  } catch {
    return [];
  }
})();

const initialState = {
  streamingList: initialItems
};

function streamingListReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        streamingList: [...state.streamingList, 
          { name: action.name, 
            id: Date.now(), 
            user: action.user,
            comment: action.comment,
            mediaType: action.mediaType || "Unknown",
            poster: action.poster || "",
            genres: action.genres || [],
            providers: action.providers || [], 
          }]
      };

    case "DELETE":
      return {
        ...state,
        streamingList: state.streamingList.filter((streamingItem) => streamingItem.id !== action.id)
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

  async function fetchTitles(title, mediaType) {
    if (!title.trim()) return [];
  
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${mediaType}?query=${encodeURIComponent(title)}&api_key=${API_KEY}`
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
                  .flatMap((g) => g.name.split(" & ")) // ✅ Split "Action & Adventure" into ["Action", "Adventure"]
                  .slice(0, 2) // ✅ Now correctly takes only 2 genres
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
  
      console.log("Raw API response:", data); // ✅ Log raw API response
  
      // Ensure we get results for US (or another region if needed)
      const providers = data.results?.US?.flatrate || data.results?.US?.buy || [];
  
      console.log("Providers before formatting:", providers); // ✅ Check providers before formatting
  
      // const formattedProviders = providers
      //   .filter(provider => provider.logo_path) // ✅ Filter out missing logos
      //   .filter(provider => !/with ads/i.test(provider.provider_name))
      //   .slice(0, 2)
      //   .map(provider => ({
      //     id: provider.provider_id,
      //     name: provider.provider_name,
      //     logo: `https://image.tmdb.org/t/p/w45${provider.logo_path}`, // ✅ Correct URL
      //   }));

    const seenProviders = new Set();

    const formattedProviders = providers
      .sort((a, b) => a.provider_name.length - b.provider_name.length) // ✅ Prioritize shorter names first
      .filter(provider => {
        const baseName = provider.provider_name
          .replace(/\b(with ads|Amazon Channel|through Prime Video|via Apple TV|on Spectrum|Spectrum|Apple TV Plus Amazon Channel)\b/gi, '') // ❌ Remove unwanted terms
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
    localStorage.setItem('streamingList', JSON.stringify(state.streamingList));
  }, [state.streamingList]);

  return (
    <StreamingListContext.Provider
      value={{
        streamingList: state.streamingList,
        dispatch,
        newItemName, setNewItemName,
        newUserName, setNewUserName,
        newComment, setNewComment,
        searchedTitles, fetchTitles,
        selectedMediaType, setSelectedMediaType,
        fetchStreamingProviders
      }}
    >
      {children}
    </StreamingListContext.Provider>
  );
}
