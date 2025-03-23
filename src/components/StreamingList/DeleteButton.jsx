import "./styles/DeleteButton.css";

export default function DeleteButton({ onDelete }) {
    return (
        <div className='btnCorner'>
                <button
                    className="deleteBtn"
                    onClick={onDelete}
                >
                    X
                </button>
        </div>
    )
}