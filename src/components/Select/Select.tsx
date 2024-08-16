import { SelectContext } from "@/context/SelectContext";
import { FC, ReactNode, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import ArrowDown from "@/assets/icons/ArrowDown.tsx";

const Select: FC<{
    placeholder?: string;
    label?: string,
    children: ReactNode | ReactNode[];
    selectedOption?: string,
    setSelectedOption: (value: string) => void,
    color?: string
}> = ({
    children,
    label,
    placeholder,
    selectedOption,
    setSelectedOption,
    color = "bg-background-default"
}) => {
    const [isDropDownShown, setIsDropDownShown] = useState(false);
    const selectContainerRef = useRef(null);

    useClickOutside(selectContainerRef, () => setIsDropDownShown(false));

    const selectPlaceholder = placeholder || "Choose an option";

    const handleClickOnOption = (option: string) => {
        setIsDropDownShown(false);
        setSelectedOption(option)
    };

    return (
        <SelectContext.Provider value={{ selectedOption: selectedOption ? selectedOption : '', changeSelectedOption: handleClickOnOption }}>
            <div className="flex flex-col gap-2 w-full min-w-48 relative" ref={selectContainerRef}>
                <p className="caption">{label}</p>
                <div
                    className={`flex w-full justify-between items-center px-3 ${color}  shadow rounded h-10 medium cursor-pointer ${selectedOption ? "text-content-primary" : "text-content-secondary"}`}
                    onClick={() => setIsDropDownShown(!isDropDownShown)}
                >
                    <span>
                        {selectedOption ? selectedOption : selectPlaceholder}
                    </span>
                    <ArrowDown />
                </div>
                <ul className={`bg-screen-default shadow rounded absolute w-full top-[106%] max-h-32 z-10 overflow-y-auto scroll-auto ${isDropDownShown ? "flex flex-col"  : "hidden"}`}>
                    {children}
                </ul>
            </div>
        </SelectContext.Provider>
    );
};

export default Select;
