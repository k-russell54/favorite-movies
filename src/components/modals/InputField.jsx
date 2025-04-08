import "./styles/InputField.css";

export default function InputField({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange,
  required,
  autoFocus,
}) {
    return (
        <div className="labelBox">
            <label className="labelText" htmlFor={id} >{label}</label>
            <div className="inputBox">
              <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                aria-required={required ? "true" : undefined}
                autoFocus={autoFocus}
              />
            </div>
          </div>
    )
}