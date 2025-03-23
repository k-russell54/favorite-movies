import "./styles/InputField.css";

export default function InputField({ label, placeholder, value, onChange }) {
    return (
        <div className="labelBox">
            <label className="labelText">{label}</label>
            <div className="inputBox">
              <input
                placeholder={placeholder}
                value={value}
                onChange={onChange}
              />
            </div>
          </div>
    )
}