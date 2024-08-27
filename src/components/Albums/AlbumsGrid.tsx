import {FC} from 'react';
import AlbumsCard from "@/components/Albums/AlbumsCard.tsx";
import {IAlbum} from "@/services/zustand/albums/albums.types.ts";

const AlbumsGrid: FC<{ albums: IAlbum[], isFavoritesList: boolean }> = ({ albums, isFavoritesList }) => {
    return (
        <div className="grid grid-cols-albums-grid-cols gap-4 w-full relative">
            {albums.map((album) => (
                <AlbumsCard key={album.id} album={album} isFavoritesList={isFavoritesList} />
            ))}
        </div>
    );
};

export default AlbumsGrid;