import { FC, useRef } from 'react';
import IconButton from '@/ui/IconButton';
import AddingCoverIcon from '@/assets/icons/AddingCoverIcon.tsx';
import AlbumImage from '@/components/Album/AlbumImage';
import FileInput from '@/components/FileInput/FileInput';
import Loader from '@/components/Loader/Loader';
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import {IMode} from "@/components/Album/AlbumContainer.tsx";

const AlbumCover: FC<{ mode: IMode, handleFileSelect: (file: File) => void }> = ({ mode, handleFileSelect }) => {
    const { selectedAlbum, newAlbum, isCoverLoading } = useAlbumsStore(state => ({
        selectedAlbum: state.selectedAlbum,
        newAlbum: state.newAlbum,
        isCoverLoading: state.isCoverUpdating,
    }));

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const cover = mode === 'create' ? newAlbum?.cover?.toString() : selectedAlbum?.cover.toString();

    const handleAddButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative w-full h-[450px] transition bg-content-secondary hover:bg-transparent max-md:max-w-[450px] max-sm:max-w-[350px] max-sm:h-[350px]">
            {isCoverLoading ? (
                <div className="w-full h-full object-cover opacity-60 border-2 border-btn-primary border-dashed">
                    <Loader />
                </div>
            ) : (
                <>
                    {mode && (
                        <FileInput
                            onFileSelect={handleFileSelect}
                            accept="image/png, image/jpeg"
                            ref={fileInputRef}
                        />
                    )}
                    {mode === 'create' && !newAlbum?.cover ? (
                        <div className="w-full h-full object-cover opacity-60 border-2 border-btn-primary border-dashed" />
                    ) : (
                        <AlbumImage
                            src={cover}
                            alt="Album Cover"
                            className={mode ? 'opacity-60 border-2 border-btn-primary border-dashed' : ''}
                        />
                    )}
                    {mode && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                            <IconButton onClick={handleAddButtonClick}>
                                <AddingCoverIcon />
                            </IconButton>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AlbumCover;
