import "./styles/SubmitButton.css";

export default function SubmitButton({ type = "button" }) {
    return (
        <div className="btnFlex">
            <button className="btn add" type={type}>
            Add Item
            </button>
        </div>
    )
}