import {FC} from "react";
import {useSelectContext} from "@/context/SelectContext.tsx";

const Option: FC<{ value: string, children: string }> = ({ value, children }) => {
    const { changeSelectedOption } = useSelectContext()

    return (
        <li
            className="paragraph pl-2 py-1 rounded cursor-pointer transition hover:bg-content-secondary"
            onClick={() => changeSelectedOption(value)}
        >
            {children}
        </li>
    );
};

export default Option;