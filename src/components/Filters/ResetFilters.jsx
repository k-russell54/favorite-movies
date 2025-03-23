import { useFilters } from "../context/FiltersProvider";
import Button from "../Button";
import "./styles/ResetFilters.css";

export default function ResetFilters() {

    const { setSelectedBrowseBy, setSelectedGenre, setSelectedRating, setSelectedService, setSelectedUser} = useFilters();

    function handleReset() {
        setSelectedBrowseBy('Browse All');
        setSelectedGenre('All Genres');
        setSelectedRating('All Ratings');
        setSelectedService('All Services');
        setSelectedUser('All Users');
    }

    return (
        <Button 
            parentClass={"addItem"} 
            childClass={"reset"} 
            handleClick={handleReset}
            btnText={"Reset Filters"}   
        />
    )
};