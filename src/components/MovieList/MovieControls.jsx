import './styles/MovieControls.css'

export default function MovieControls({ setModalIsActive, onClear }) {
    return (
        <div className="inputArea">
        <button
          className="btn add"
          onClick={() => {
            setModalIsActive(true);
          }}
        >
          Add Movie
        </button>
        <button className="btn clear" onClick={onClear}>
          Clear Movies
        </button>
      </div>
    )
}