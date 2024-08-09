import { FC } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large' | 'full';
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses = {
  small: 'w-24 h-8',
  medium: 'w-32 h-10',
  large: 'w-48 h-12',
  full: 'w-full h-12',
};

const Button: FC<ButtonProps> = ({ type = 'button', text, onClick, size = 'full' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-btn-primary text-btn-text flex items-center justify-center paragraph rounded transition hover:bg-btn-hover ${sizeClasses[size]}`}
    >
      {text}
    </button>
  );
};

export default Button;
