import { ReactNode } from 'react';

const AlbumInfoGrid = ({ children } : { children: ReactNode }) => {
  return (
    <div className="relative w-[90%] m-auto -top-[100px] grid grid-cols-album-page-columns gap-8 items-center justify-center">
      {children}
    </div>
  );
};

export default AlbumInfoGrid;