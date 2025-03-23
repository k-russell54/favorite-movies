import "../../modals/styles/InputField.css";

export default function LabeledBox({ label, children }) {
    return (
       <div className="labelBox">
            <label className="labelText">{label}</label>
            <div className="inputBox">
                {children}
            </div>
        </div>
    );
}