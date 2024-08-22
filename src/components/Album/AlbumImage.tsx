import {FC} from "react";

interface AlbumImageProps {
    src?: string;
    alt: string;
    className?: string;
}

const AlbumImage: FC<AlbumImageProps> = ({ src, alt, className }) => {
    return (
        <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover shadow-2xl ${className}`}
        />
    );
};

export default AlbumImage;
