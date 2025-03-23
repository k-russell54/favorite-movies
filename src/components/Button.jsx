import './Button.css';

export default function Button({ 
    parentClass = "", 
    childClass = "", 
    handleClick = () => {}, 
    btnText = "Click Me" 
}) {
    
        return (
            parentClass ? (
                <div className={parentClass}>
                    <button
                        className={`btn ${childClass}`}
                        onClick={handleClick}
                    >
                        {btnText}
                    </button>
                </div>
            ) : (
                <button
                    className={`btn ${childClass}`}
                    onClick={handleClick}>
                    {btnText}
                </button>
        )
    )
};