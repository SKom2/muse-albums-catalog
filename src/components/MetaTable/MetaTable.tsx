import Input from "@/ui/Input.tsx";
import {ALBUM_FIELDS} from "@/hooks/useAlbumEditor.tsx";
import Select from "@/components/Select/Select.tsx";
import Options from "@/components/Select/Options.tsx";
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import {FC, ReactNode, useEffect, useMemo} from "react";
import {IMode} from "@/components/Album/AlbumContainer.tsx";
import {FieldValues, UseFormSetValue} from "react-hook-form";

const Row = ({ children } : { children: ReactNode }) => {
    return <div className="grid grid-cols-2 w-full justify-between items-center max-md:grid-cols-[120px_1fr] max-md:gap-4 ">{children}</div>
}

const TableHeader = ({ children } : { children: ReactNode }) => {
    return <b className="caption max-sm:small">{children}</b>
}

const TableData = ({ children }: { children: ReactNode }) => {
    return <span className="medium text-end self-end">{children}</span>
}

const TableCell = ({ mode, children, data }: { mode: IMode, children: ReactNode, data: string | number | undefined }) => {
    return  <>{mode ? <>{children}</> : <TableData>{data}</TableData>}</>
}

const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

const MetaTable: FC<{
    mode: IMode;
    register: any;
    handleFieldsOnChange: (name: string, value: string) => void;
    setValue: UseFormSetValue<FieldValues>
}> = ({ mode, register, handleFieldsOnChange, setValue }) =>{
    const formats = useFiltersStore(state => state.formats);
    const genres = useFiltersStore(state => state.genres);
    const selectedAlbum = useAlbumsStore(state => state.selectedAlbum);
    const newAlbum = useAlbumsStore(state => state.newAlbum);
    const isCreateMode = mode === "create";

    const formattedDate = useMemo(() => {
        const date = isCreateMode ? newAlbum?.date_of_issue : selectedAlbum?.date_of_issue;
        if (!date) return 'Unknown date';
        return formatDate(date);
    }, [isCreateMode, newAlbum, selectedAlbum]);

    useEffect(() => {
        setValue(ALBUM_FIELDS.DATE_OF_ISSUE, isCreateMode ? newAlbum?.date_of_issue?.toString() : selectedAlbum?.date_of_issue?.toString());
        setValue(ALBUM_FIELDS.NUMBER_OF_TRACKS, isCreateMode ? newAlbum?.number_of_tracks?.toString() : selectedAlbum?.number_of_tracks?.toString());
    }, []);

    return (
        <div
            className={`grid grid-rows-4 w-full items-center ${mode ? 'gap-2' : 'gap-4'}`}>
            <Row>
                <TableHeader>Date of issue</TableHeader>
                <TableCell mode={mode} data={formattedDate}>
                    <Input
                        name={ALBUM_FIELDS.DATE_OF_ISSUE}
                        type="date"
                        register={register}
                    />
                </TableCell>
            </Row>
            <Row>
                <TableHeader>Number of tracks</TableHeader>
                <TableCell mode={mode} data={selectedAlbum?.number_of_tracks}>
                    <Input
                        type="number"
                        name={ALBUM_FIELDS.NUMBER_OF_TRACKS}
                        register={register}
                        placeholder="10"
                    />
                </TableCell>
            </Row>
            <Row>
                <TableHeader>Release source</TableHeader>
                <TableCell mode={mode} data={selectedAlbum?.format_name}>
                    <Select
                        placeholder="Choose format"
                        selectedOption={isCreateMode ? newAlbum?.format_name : selectedAlbum?.format_name}
                        setSelectedOption={(value) => handleFieldsOnChange(ALBUM_FIELDS.FORMAT_NAME, value)}
                    >
                        <Options options={formats}/>
                    </Select>
                </TableCell>
            </Row>
            <Row>
                <TableHeader>Genre</TableHeader>
                <TableCell mode={mode} data={selectedAlbum?.genre_name}>
                    <Select
                        placeholder="Choose genre"
                        selectedOption={isCreateMode ? newAlbum?.genre_name : selectedAlbum?.genre_name}
                        setSelectedOption={(value) => handleFieldsOnChange(ALBUM_FIELDS.GENRE_NAME, value)}
                    >
                        <Options options={genres}/>
                    </Select>
                </TableCell>
            </Row>
        </div>
    );
};

export default MetaTable;