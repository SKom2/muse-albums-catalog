import AlbumCard from '@/components/Albums/AlbumCard.tsx';
import { IAlbum } from '@/services/zustand/albums/albums.types.ts';

const AlbumsList = ({ albums }: { albums: IAlbum[] }) => {
  return (
    <div className="grid grid-cols-auto-fit-minmax gap-8 w-full relative">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumsList;
