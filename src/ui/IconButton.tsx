import { FC, ReactNode } from 'react';

interface IconButtonProps {
  onClick?: () => void;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

const sizeClasses = {
  small: 'w-8 h-8',
  medium: 'w-10 h-10',
  large: 'w-12 h-12',
};

const IconButton: FC<IconButtonProps> = ({ onClick, children, size = 'medium' }) => {
  return (
    <button
      className={`bg-btn-primary rounded-full text-btn-text flex items-center justify-center uppercase paragraph transition hover:bg-btn-hover ${sizeClasses[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
