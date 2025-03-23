import "./styles/BrowseByFilter.css";
import { useFilters } from "../context/FiltersProvider";
import FilterDropdown from "./FilterDropdown";

export default function BrowseByFilter() {
    const { selectedBrowseBy, setSelectedBrowseBy, initialBrowseByList } = useFilters()

    return (
        <FilterDropdown 
            options={initialBrowseByList}
            selectedValue={selectedBrowseBy}
            onChange={setSelectedBrowseBy}
            rootFilter="Browse All"
        />
    );
}