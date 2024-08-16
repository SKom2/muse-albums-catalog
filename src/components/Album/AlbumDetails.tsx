import { FC } from 'react';
import Input from '@/ui/Input';
import {IMode} from "@/components/Album/AlbumContainer.tsx";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";

const AlbumDetails: FC<{
    mode: IMode;
    register: any;
}> = ({ mode, register }) => {
    const isCreateMode = mode === "create"

    const selectedAlbum = useAlbumsStore(state => state.selectedAlbum)
    const newAlbum = useAlbumsStore(state => state.newAlbum)

    return (
        <div className="pt-20 flex flex-col gap-2 items-start justify-start">
            {mode ? (
                <div className="max-w-[450px] w-full grid gap-4">
                    <Input
                        name="name"
                        label="Album Title"
                        register={register}
                        placeholder="Album title"
                        defaultValue={isCreateMode ? newAlbum?.name : selectedAlbum?.name}
                    />
                    <Input
                        name="artist_name"
                        label="Artist"
                        register={register}
                        placeholder="Artist"
                        defaultValue={isCreateMode ? newAlbum?.artist_name : selectedAlbum?.artist_name}
                    />
                </div>
            ) : (
                <>
                    <h1 className="heading w-fit">{selectedAlbum?.name}</h1>
                    <h2 className="heading-2 w-fit">{selectedAlbum?.artist_name}</h2>
                </>
            )}
        </div>
    );
};

export default AlbumDetails;
