import { useEffect, useState} from 'react';
import "./styles/Filters.css";
import AddItemButton from "./AddItemButton";
import GenreFilter from "./GenreFilter";
import BrowseByFilter from "./BrowseByFilter";
import ServiceFilter from "./ServiceFilter";
import UserFilter from "./UserFilter";
import ResetFilters from "./ResetFilters";
import FilterModalWrapper from "./modals/FilterModalWrapper";
import Button from '../Button';

export default function Filters() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [showFilterModal, setShowFilterModal] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth < 768);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className="divFlex container">
            <div className="filterContainer">
                {isSmallScreen ? (
                    <>
                        <Button 
                            parentClass={"addItem"} 
                            childClass ={"filter"} 
                            handleClick={() => setShowFilterModal(true)}
                            btnText='Filters'
                        />
                        <ResetFilters />
                        <AddItemButton />
                        {showFilterModal && (
                            <FilterModalWrapper closeModal={() => setShowFilterModal(false)} />
                        )}
                    </>
                    ) : (
                       <>
                        <BrowseByFilter />
                        <GenreFilter />
                        <ServiceFilter />
                        <UserFilter />
                        <ResetFilters />
                        <AddItemButton />
                       </> 
                    )}
            </div>
        </div>
    )
}