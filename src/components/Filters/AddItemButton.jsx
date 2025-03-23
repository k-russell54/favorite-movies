import { useUI } from '../context/UIProvider';
import Button from '../Button';

export default function AddItemButton() {

  const {setModalIsActive} = useUI();

    return (
      <Button 
        parentClass={"addItem"} 
        childClass ={"add"} 
        handleClick={setModalIsActive} 
        btnText={"Add"} 
      />
    )
}