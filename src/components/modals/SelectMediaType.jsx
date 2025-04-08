import { useStreaming } from "../context/StreamingProvider";
import "./styles/InputField.css";

export default function SelectMediaType({id, label, required}) { 

    const {selectedMediaType, setSelectedMediaType} = useStreaming();

    return (
        <div className="labelBox">
            <label htmlFor={id} className="labelText">{label} </label>
            <div className="inputBox">
                <select 
                    id={id}
                    value={selectedMediaType} 
                    onChange={(e) => setSelectedMediaType(e.target.value)}
                    required={required}
            >
                    <option value="selectType">Select Type</option>
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                </select>
            </div>
        </div>  
    )
};