import {FC, ReactNode} from 'react';

interface IconButtonProps {
  onClick?: (e?: any) => void;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  type?: 'submit' | 'reset' | 'button';
}

const sizeClasses = {
  small: 'min-w-8 h-8',
  medium: 'min-w-10 h-10',
  large: 'min-w-12 h-12',
};

const IconButton: FC<IconButtonProps> = ({ type = 'button', onClick, children, size = 'medium' }) => {
  return (
    <button
      type={type}
      className={`bg-btn-primary rounded-full text-btn-text flex items-center justify-center uppercase paragraph transition hover:bg-btn-hover ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
