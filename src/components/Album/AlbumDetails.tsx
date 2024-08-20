import { FC, useEffect } from 'react';
import Input from '@/ui/Input';
import { IMode } from "@/components/Album/AlbumContainer.tsx";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import {ALBUM_FIELDS} from "@/hooks/useAlbumEditor.tsx";

const AlbumDetails: FC<{
    mode: IMode;
    register: any;
    setValue: UseFormSetValue<FieldValues>
}> = ({ mode, register, setValue }) => {
    const isCreateMode = mode === "create";
    const selectedAlbum = useAlbumsStore(state => state.selectedAlbum);
    const newAlbum = useAlbumsStore(state => state.newAlbum);

    useEffect(() => {
        setValue(ALBUM_FIELDS.NAME, isCreateMode ? newAlbum?.name : selectedAlbum?.name);
        setValue(ALBUM_FIELDS.ARTIST_NAME, isCreateMode ? newAlbum?.artist_name : selectedAlbum?.artist_name);
    }, []);

    return (
        <div className="pt-20 flex flex-col gap-2 items-start justify-start">
            {mode ? (
                <div className="max-w-[450px] w-full grid gap-4">
                    <Input
                        name={ALBUM_FIELDS.NAME}
                        label="Album Title"
                        register={register}
                        placeholder="Album title"
                    />
                    <Input
                        name={ALBUM_FIELDS.ARTIST_NAME}
                        label="Artist"
                        register={register}
                        placeholder="Artist"
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
