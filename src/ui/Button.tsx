import { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="bg-primaryBtn text-white w-full h-[46px] rounded-xl">
      {text}
    </button>
  );
};

export default Button;