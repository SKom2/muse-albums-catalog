import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import {FC, useEffect} from "react";
import {IMode} from "@/components/Album/AlbumContainer.tsx";
import {FieldValues, UseFormSetValue} from "react-hook-form";
import {ALBUM_FIELDS} from "@/hooks/useAlbumEditor.tsx";

const AlbumDescription: FC<{ mode: IMode, register: any, setValue: UseFormSetValue<FieldValues> }> = ({ mode, register, setValue }) => {
    const isCreateMode = mode === "create";
    const selectedAlbum = useAlbumsStore(state => state.selectedAlbum);
    const newAlbum = useAlbumsStore(state => state.newAlbum);

    useEffect(() => {
        setValue(ALBUM_FIELDS.DESCRIPTION, isCreateMode ? newAlbum?.description : selectedAlbum?.description);
    }, []);

    return (
        <>
            {mode ?
                <textarea className="bg-screen-default rounded-xl shadow h-full w-full p-4 paragraph hover:outline hover:outline-amber-300" {...register(ALBUM_FIELDS.DESCRIPTION)} />
                :
                <div className="bg-screen-default rounded-xl shadow h-full w-full p-4 paragraph">{selectedAlbum?.description}</div>
            }
        </>
    );
};

export default AlbumDescription;