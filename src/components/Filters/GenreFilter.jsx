import "./styles/GenreFilter.css";
import { useFilters } from "../context/FiltersProvider";
import FilterDropdown from "./FilterDropdown";

export default function GenreFilter() {
    const { selectedGenre, setSelectedGenre, initialGenreList } = useFilters(); 

    return (
        <FilterDropdown 
            options={initialGenreList}
            selectedValue={selectedGenre}
            onChange={setSelectedGenre}
            rootFilter="All Genres"
        />
    );
}
