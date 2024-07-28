import { FC, ReactNode } from 'react';

interface NavBlockProps {
  children?: ReactNode;
  alignment?: 'start' | 'center' | 'end';
}

const HeaderSection: FC<NavBlockProps> = ({ children, alignment }) => {
  let justifyContent;
  switch (alignment) {
    case 'start':
      justifyContent = 'justify-start';
      break;
    case 'center':
      justifyContent = 'justify-center';
      break;
    case 'end':
      justifyContent = 'justify-end';
      break;
    default:
      justifyContent = 'justify-start';
  }

  return (
    <div className={`flex ${justifyContent} items-center gap-2 h-full`}>
      {children}
    </div>
  );
};

export default HeaderSection;
