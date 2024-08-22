import { ReactNode } from 'react';

const AlbumInfoColumn = ({ children } : { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col gap-4 items-start max-md:w-full max-md:items-center">
      {children}
    </div>
  );
};

export default AlbumInfoColumn;