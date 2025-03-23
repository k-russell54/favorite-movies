import { useFilters } from "../context/FiltersProvider";
import FilterDropdown from "./FilterDropdown";

export default function ServiceFilter() {
    const { initialServiceList, selectedService, setSelectedService } = useFilters();

    return (
        <FilterDropdown 
            options={initialServiceList}
            selectedValue={selectedService}
            onChange={setSelectedService} 
            rootFilter="All Services" 
        />
    )
};