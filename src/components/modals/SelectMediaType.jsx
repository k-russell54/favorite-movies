import { useStreaming } from "../context/StreamingProvider";
import "./styles/InputField.css";

export default function SelectMediaType() { 

    const {selectedMediaType, setSelectedMediaType} = useStreaming();

    return (
        <div className="labelBox">
            <label className="labelText">Streaming Type: </label>
            <div className="inputBox">
                <select 
                    id="mediaType"
                    value={selectedMediaType} 
                    onChange={(e) => setSelectedMediaType(e.target.value)}
            >
                    <option value="selectType">Select Type</option>
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                </select>
            </div>
        </div>  
    )
};