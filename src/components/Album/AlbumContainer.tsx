import { FC, useEffect } from 'react';
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import { useParams } from "react-router-dom";
import DisplayAlbum from "@/components/Album/DisplayAlbum.tsx";

export type IMode = "edit" | "create" | undefined

const AlbumContainer: FC<{ mode?: IMode }> = ({ mode }) => {
    const { albumId } = useParams();

    const getAlbum = useAlbumsStore(state => state.fetchAlbumById);

    useEffect(() => {
        if (albumId) {
            getAlbum(albumId)
        }
    }, [getAlbum, albumId]);

    return (
        <section className="min-h-60">
            <DisplayAlbum mode={mode} />
        </section>
    );
};

export default AlbumContainer;
