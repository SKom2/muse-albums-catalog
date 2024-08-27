import AlbumInfoColumn from "@/components/Album/AlbumInfoColumn.tsx";
import AlbumCover from "@/components/Album/AlbumCover.tsx";
import AlbumMeta from "@/components/Album/AlbumMeta.tsx";
import AlbumDetails from "@/components/Album/AlbumDetails.tsx";
import AlbumDescription from "@/components/Album/AlbumDescription.tsx";
import AlbumView from "@/components/Album/AlbumView.tsx";
import {useAlbumEditor} from "@/hooks/useAlbumEditor.tsx";
import {FC} from "react";
import {IMode} from "@/components/Album/AlbumContainer.tsx";
import Loader from "@/components/Loader/Loader.tsx";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";

const DisplayAlbum: FC<{ mode: IMode }> = ({ mode }) => {
    const isLoading = useAlbumsStore(state => state.isLoading);

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
                    <AlbumDescription
                        mode={mode}
                        register={register}
                        setValue={setValue}
                    />
                </AlbumInfoColumn>
            </div>
        </AlbumView>
    );
};

export default DisplayAlbum;