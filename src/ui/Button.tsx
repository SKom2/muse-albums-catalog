import {FC, ReactNode} from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large' | 'full';
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses = {
  small: 'w-24 h-8',
  medium: 'w-32 h-11 max-md:w-full',
  large: 'w-48 h-12 max-xl:w-40 max-lg:w-36 max-md:w-24',
  full: 'w-full h-12',
};

const Button: FC<ButtonProps> = ({ type = 'button', children, onClick, size = 'full' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-btn-primary text-btn-text flex items-center justify-center paragraph rounded transition hover:bg-btn-hover ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
};

export default Button;
