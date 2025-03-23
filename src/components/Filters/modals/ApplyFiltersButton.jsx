import "../../modals/styles/InputField.css";
import Button from '../../Button';

export default function ApplyFiltersButton({ closeModal }) {

    return (
       <div className="labelBox">
            <div className="inputBox">
                <Button 
                    parentClass={"addItem"} 
                    childClass ={"reset"} 
                    handleClick={closeModal} 
                    btnText={"Apply Filters"}
                />
            </div>
        </div>
    );
}


