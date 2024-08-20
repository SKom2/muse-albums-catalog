import {FC, FormEvent, ReactNode} from 'react';
import Button from '@/ui/Button';
import { Toaster } from 'react-hot-toast';
import { IMode } from '@/components/Album/AlbumContainer';

interface AlbumViewProps {
    children: ReactNode;
    mode: IMode;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const AlbumView: FC<AlbumViewProps> = ({ children, mode, handleSubmit }) => {
    if (mode) {
        return (
            <>
                <form className="grid grid-cols-album-page-columns gap-6 items-center justify-center" onSubmit={handleSubmit}>
                    {children}
                    <div className="col-span-full">
                        <Button text="Save changes" type="submit" />
                    </div>
                </form>
                <Toaster position="top-left" reverseOrder={false} />
            </>
        );
    }

    return (
        <div className="grid grid-cols-album-page-columns gap-8 items-center justify-center">
            {children}
        </div>
    );
};

export default AlbumView;
