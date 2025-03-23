import LabeledBox from "./LabeledBox";
import BrowseByFilter from "../BrowseByFilter";
import GenreFilter from "../GenreFilter";
import ServiceFilter from "../ServiceFilter";
import UserFilter from "../UserFilter";
import ApplyFiltersButton from "./ApplyFiltersButton";
import "../../modals/styles/AddItemModal.css";

export default function FilterModal({ closeModal }) {

    return (
        <div className="form">
            <h2 className="addTitle">Filter Streaming Items:</h2>
                <LabeledBox label="Browse By:">
                    <BrowseByFilter />
                </LabeledBox>
                <LabeledBox label="Genres:">
                    <GenreFilter />
                </LabeledBox>
                <LabeledBox label="Streaming Services:">
                    <ServiceFilter />
                </LabeledBox>
                <LabeledBox label="User:">
                    <UserFilter />
                </LabeledBox>
                <ApplyFiltersButton closeModal={closeModal} />
        </div>
    )
}