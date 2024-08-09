import FilterIcon from "@/assets/icons/FilterIcon.tsx";
import {FC} from "react";

const OpenFiltersButton: FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <button type="button" className="flex gap-2 rounded h-full bg-screen-default items-center px-2 shadow transition-opacity hover:opacity-80" onClick={onClick}>
            <FilterIcon />
            <span className="medium">Filters</span>
        </button>
    );
};

export default OpenFiltersButton;