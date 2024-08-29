import { FC } from 'react';

interface InputProps {
  register: any;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  label?: string;
  id?: string;
  onChange?: (value: string) => void;
}

const Input: FC<InputProps> = ({
                                 id,
                                 label,
                                 name,
                                 autoComplete,
                                 register,
                                 type = "text",
                                 placeholder,
                                 required = true,
                               }) => {
    return (
      <>
        {label && <label htmlFor={id} className="caption w-full">{label}</label>}
        <input
            id={id}
            name={name}
            {...register(name)}
            type={type}
            placeholder={placeholder}
            className="w-full h-11 pl-3 shadow rounded min-w-[120px] bg-input-default main-text border border-screen-default focus:outline-none appearance-none focus:border-content-secondary"
            autoComplete={autoComplete}
            required={required}
        />
      </>
    );
};

export default Input;
