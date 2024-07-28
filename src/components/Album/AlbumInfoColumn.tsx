import { ReactNode } from 'react';

const AlbumInfoColumn = ({ children } : { children: ReactNode }) => {
  return (
    <div className="h-full flex flex-col gap-4">
      {children}
    </div>
  );
};

export default AlbumInfoColumn;