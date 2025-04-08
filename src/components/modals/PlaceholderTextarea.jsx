import { useState, useEffect } from "react";
import "./styles/InputField.css";

export default function PlaceholderTextarea({ 
  id,
  label,
  value, 
  onChange 
}) {
    const placeholders = [
        "I thought about this movie for days!",
        "This one is INTENSE",
        "I laughed so much!",
        "Kind of scary!",
        "This one made me cry!"
      ]
    
    const [placeholder, setPlaceholder] = useState(placeholders[0]);
    
    useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
        index = (index + 1) % placeholders.length;
        setPlaceholder(placeholders[index]);
    }, 2000);

    return () => clearInterval(interval);
    }, []);

    return (
        <div className="labelBox">
        <label className="labelText" htmlFor={id} >{label}</label>
        <div className="inputBox">
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    )
}