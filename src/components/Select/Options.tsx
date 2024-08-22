import {FC} from 'react';
import Option from "@/components/Select/Option.tsx";

const Options: FC<{options: any}> = ({ options }) => {
    return (
        <>
            {options && options.map((option: any) => (
                <Option key={option.id} value={option.name}>{option.name}</Option>
            ))}
        </>
    );
};

export default Options;