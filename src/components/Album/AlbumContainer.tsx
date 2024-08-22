import AlbumMeta from '@/components/Album/AlbumMeta.tsx';
import AlbumDetails from '@/components/Album/AlbumDetails.tsx';
import AlbumCover from '@/components/Album/AlbumCover.tsx';
import AlbumInfoColumn from '@/components/Album/AlbumInfoColumn.tsx';
import { FC, useEffect } from 'react';
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import { useParams } from "react-router-dom";
import AlbumView from "@/components/Album/AlbumView.tsx";
import {useAlbumEditor} from "@/hooks/useAlbumEditor.tsx";
import Loader from "@/components/Loader/Loader.tsx";

export type IMode = "edit" | "create" | undefined

const AlbumContainer: FC<{ mode?: IMode }> = ({ mode }) => {
    const { albumId } = useParams();

    const getAlbum = useAlbumsStore(state => state.getAlbum);
    const isLoading = useAlbumsStore(state => state.isLoading);

    useEffect(() => {
        if (albumId) {
            getAlbum(albumId)
        }
    }, [getAlbum, albumId]);

    const {
        handleFileSelect,
        handleFieldsOnChange,
        handleSubmit,
        register,
        setValue
    } = useAlbumEditor({ mode });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className="">
            <AlbumView mode={mode} handleSubmit={handleSubmit}>
                <div className="grid grid-cols-album-page-columns gap-6 items-center justify-center max-md:flex max-md:flex-col-reverse">
                    <AlbumInfoColumn>
                        <AlbumCover
                            mode={mode}
                            handleFileSelect={handleFileSelect}
                        />
                        <AlbumMeta
                            mode={mode}
                            register={register}
                            setValue={setValue}
                            handleFieldsOnChange={handleFieldsOnChange}
                        />
                    </AlbumInfoColumn>
                    <AlbumInfoColumn>
                        <AlbumDetails
                            setValue={setValue}
                            mode={mode}
                            register={register}
                        />
                        <div className="bg-screen-default rounded-xl shadow h-full w-full p-4 paragraph max-md:hidden"></div>
                    </AlbumInfoColumn>
                </div>
            </AlbumView>
        </section>
    );
};

export default AlbumContainer;
