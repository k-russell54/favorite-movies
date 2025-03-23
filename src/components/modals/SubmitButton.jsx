import "./styles/SubmitButton.css";

export default function SubmitButton({ onClick }) {
    return (
        <div className="btnFlex">
            <button className="btn add" onClick={onClick}>
            Add Item
            </button>
        </div>
    )
}