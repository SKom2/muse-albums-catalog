import {ChangeEvent, forwardRef} from "react";

interface FileInputProps {
    onFileSelect: (file: File) => void;
    accept: string;
}

// Передаем оба параметра: props и ref
const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ onFileSelect, accept }, ref) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <input
            ref={ref}
            type="file"
            className="absolute w-full h-full z-10 opacity-0 cursor-pointer"
            accept={accept}
            onChange={handleFileChange}
        />
    );
});

export default FileInput;
