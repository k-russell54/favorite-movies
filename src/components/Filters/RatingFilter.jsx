import { useFilters } from "../context/FiltersProvider";
import FilterDropdown from "./FilterDropdown";

export default function RatingFilter() {
    const { initialRatingsList, selectedRating, setSelectedRating } = useFilters();

    return (
        <FilterDropdown 
            options={initialRatingsList}
            selectedValue={selectedRating}
            onChange={setSelectedRating}
        />
    )
};