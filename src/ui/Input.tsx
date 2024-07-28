import { FC } from 'react';

interface InputProps {
  register: any;
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
}

const Input: FC<InputProps> = ({  name, autoComplete, register, type = "text", placeholder, required = true }) => {
  return (
    <input
      name={name}
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className="w-full h-11 pl-3 shadow rounded-xl bg-input-default main-text border border-content-primary focus:outline-none appearance-none"
      autoComplete={autoComplete}
      required={required}
    />
  );
};

export default Input;