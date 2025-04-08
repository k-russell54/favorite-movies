import { useStreaming } from "../context/StreamingProvider";
import { useFilters } from "../context/FiltersProvider";
import { useUI } from "../context/UIProvider";
import InputField from "./InputField";
import PlaceholderTextarea from "./PlaceholderTextarea";
import SubmitButton from "./SubmitButton";
import SelectMediaType from "./SelectMediaType";
import "./styles/AddItemModal.css";
import toCapitalize from "../../utils";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";


export default function AddItemModal() {
  const {  
    newItemName, 
    setNewItemName, 
    newUserName, 
    setNewUserName, 
    newComment, 
    setNewComment, 
    fetchTitles, 
    selectedMediaType, 
    setSelectedMediaType, 
    fetchStreamingProviders,
    newYearInput,
    setNewYearInput
  } = useStreaming();

  const { setUpdatedUserList } = useFilters();
  const { setModalIsActive } = useUI();

  async function handleAdd(e) {
    e.preventDefault();
    if (!newItemName.trim() || !newUserName.trim()) {
      alert("Please fill out the title and your name!");
      setNewItemName("");
      setNewUserName("");
      return;
    }
  
    try {
      const searchResults = await fetchTitles(newItemName, selectedMediaType, newYearInput);
  
      if (searchResults.length === 0) {
        alert("No matching titles found. Please try again.");
        return;
      }
  
      const streamingData = searchResults[0]; // Get first result
      
      const providers = await fetchStreamingProviders(streamingData.id, selectedMediaType);

      await addDoc(collection(db, "streamingItems"), {
        title: streamingData.title,
        user: toCapitalize(newUserName),
        comment: newComment,
        mediaType: selectedMediaType,
        poster: streamingData.poster || "",
        genres: streamingData.genres || [],
        providers,
        year: newYearInput || "",
        timestamp: new Date()
      });      

      setNewItemName("");
      setNewUserName("");
      setNewYearInput("");
      setNewComment("");
      setSelectedMediaType('Select Type');
      setModalIsActive(false);
      
      setUpdatedUserList((prevItems) =>
        prevItems.includes(newUserName) 
          ? prevItems 
          : [...prevItems, toCapitalize(newUserName)]
      );

    } catch (error) {
      console.error("Error adding item", error);
    } 
  }


  return (
    <form 
      className="form" 
      onSubmit={handleAdd}
      aria-labelledby="add-item-form-title"
    >
        <h2 id="add-item-form-title" className="addTitle">
          Add a New Streaming Item
        </h2>

        <div className="labelBoxFlex">
          <InputField 
            id="streaming-title"
            label="*Streaming Title:"
            placeholder="Enter a title..."
            onChange={(e) => setNewItemName(e.target.value)}
            value={newItemName}
            required
            aria-required="true"
            autoFocus
          />

          <SelectMediaType 
            id="media-type"
            label="*Streaming Type:"
            required
          />

          <InputField
            id="release-year"
            label="Release Year:"
            placeholder="e.g., 2020 (optional)"
            value={newYearInput}
            onChange={(e) => setNewYearInput(e.target.value)}
          />

          <div className="lineBarrier"></div>

          <InputField 
            id="user-name"
            label="*Your Name:"
            value={newUserName}
            placeholder="Enter your name..."
            onChange={(e) => setNewUserName(e.target.value)}
            required
            aria-required="true"
          />

          <PlaceholderTextarea
            id="user-comment"
            label="Comments:" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <SubmitButton type="submit" />
        <p className="helperText"> Didn't get the right title? Try deleting it and re-adding with the release year! </p>
    </form>
  );
}
