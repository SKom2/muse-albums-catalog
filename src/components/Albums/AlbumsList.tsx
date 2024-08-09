import AlbumsCard from '@/components/Albums/AlbumsCard.tsx';
import { IAlbum } from '@/services/zustand/albums/albums.types.ts';

const AlbumsList = ({ albums }: { albums: IAlbum[] }) => {
  return (
    <div className="grid grid-cols-albums-grid-cols gap-4 w-full relative">
      {albums.map((album) => (
        <AlbumsCard key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumsList;
