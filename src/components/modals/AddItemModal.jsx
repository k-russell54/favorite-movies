import { useStreaming } from "../context/StreamingProvider";
import { useFilters } from "../context/FiltersProvider";
import { useUI } from "../context/UIProvider";
import InputField from "./InputField";
import PlaceholderTextarea from "./PlaceholderTextarea";
import SubmitButton from "./SubmitButton";
import SelectMediaType from "./SelectMediaType";
import "./styles/AddItemModal.css";
import toCapitalize from "../../utils";

export default function AddItemModal() {
  const { dispatch, newItemName, setNewItemName, newUserName, setNewUserName, newComment, setNewComment, fetchTitles, selectedMediaType, setSelectedMediaType, fetchStreamingProviders } = useStreaming();
  const { setUpdatedUserList } = useFilters();
  const { setModalIsActive } = useUI();

  async function handleAdd() {
    if (!newItemName.trim() || !newUserName.trim()) {
      alert("Please fill out the title and your name!");
      setNewItemName("");
      setNewUserName("");
      return;
    }
  
    try {
      const searchResults = await fetchTitles(newItemName, selectedMediaType);
  
      if (searchResults.length === 0) {
        alert("No matching titles found. Please try again.");
        return;
      }
  
      const streamingData = searchResults[0]; // Get first result
      const providers = await fetchStreamingProviders(streamingData.id, selectedMediaType);

      dispatch({ 
        type: "ADD", 
        name: streamingData.title,
        user: toCapitalize(newUserName),
        comment: newComment,
        mediaType: selectedMediaType,
        poster: streamingData.poster || "",
        genres: streamingData.genres || [],
        providers
      });
  
      console.log("Dispatching:", streamingData); // ✅ Log dispatched item
      
      setNewItemName("");
      setNewUserName("");
      setNewComment("");
      setSelectedMediaType('Select Type');
      setModalIsActive(false);
      setUpdatedUserList((prevItems) =>
        prevItems.includes(newUserName) ? prevItems : [...prevItems, toCapitalize(newUserName)]
      );
    } catch (error) {
      console.error("Error adding item", error);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="form" onKeyDown={handleKeyDown}>
        <h2 className="addTitle">Add a New Streaming Item</h2>
        <div className="labelBoxFlex">
          <InputField 
            label="Streaming Title:"
            placeholder="Enter a title..."
            onChange={(e) => setNewItemName(e.target.value)}
            value={newItemName}
          />
          <SelectMediaType />
          <div className="lineBarrier"></div>
          <InputField 
            label="Your Name:"
            value={newUserName}
            placeholder="Enter your name..."
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <PlaceholderTextarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <SubmitButton onClick={handleAdd} />
    </div>
  );
}
