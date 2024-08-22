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
                <form onSubmit={handleSubmit}>
                    {children}
                    <div className="col-span-full mt-4 max-md:w-full">
                        <Button  type="submit">Save changes</Button>
                    </div>
                </form>
                <Toaster position="top-left" reverseOrder={false} />
            </>
        );
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default AlbumView;
