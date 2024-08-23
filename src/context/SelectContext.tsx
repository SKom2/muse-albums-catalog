import {createContext, useContext} from "react";

export const SelectContext = createContext<{
    selectedOption: string,
    changeSelectedOption: (option: string) => void,
}>({
    selectedOption: "",
    changeSelectedOption: () => {},
})

export const useSelectContext = () => {
    const context = useContext(SelectContext);

    if (!context) {
        throw new Error('useSelectContext must be used within a SelectProvider');
    }

    return context
}