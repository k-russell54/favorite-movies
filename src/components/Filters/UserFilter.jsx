import { useFilters } from "../context/FiltersProvider";
import FilterDropdown from "./FilterDropdown";

export default function UserFilter() {
    const { updatedUserList, selectedUser, setSelectedUser } = useFilters();

    return (
        <FilterDropdown 
            options={updatedUserList}
            selectedValue={selectedUser}
            onChange={setSelectedUser}
            rootFilter="All Users"
        />
    )
};