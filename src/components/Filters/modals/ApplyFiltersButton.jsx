import "../../modals/styles/InputField.css";
import Button from '../../Button';

export default function ApplyFiltersButton() {

    return (
       <div className="labelBox">
            <div className="inputBox">
                <Button 
                    parentClass={"addItem"} 
                    childClass ={"reset"} 
                    btnText={"Apply Filters"}
                />
            </div>
        </div>
    );
}


