import {FC, FormEvent, useCallback, useEffect} from "react";
import Select from "@/components/Select/Select.tsx";
import Option from "@/components/Select/Option.tsx";
import Button from "@/ui/Button.tsx";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";

const Filters: FC<{ isFiltersVisible: boolean, setIsFiltersVisible: (isVisible: boolean) => void }> = ({ isFiltersVisible, setIsFiltersVisible }) => {
    const selectedGenre = useFiltersStore(state => state.selectedGenre);
    const setSelectedGenre = useFiltersStore(state => state.setSelectedGenre);
    const selectedFormat = useFiltersStore(state => state.selectedFormat);
    const setSelectedFormat = useFiltersStore(state => state.setSelectedFormat);
    const genres = useFiltersStore(state => state.genres);
    const getGenres = useFiltersStore(state => state.getGenres);
    const formats = useFiltersStore(state => state.formats);
    const getFormats = useFiltersStore(state => state.getFormats);

    const filterAlbums = useAlbumsStore(state => state.fetchAlbums)

    const fetchFilters = useCallback(async () => {
        try {
            await Promise.all([getGenres(), getFormats()]);
        } catch (error) {
            console.error("Failed to fetch filters:", error);
        }
    }, [getGenres, getFormats]);

    useEffect(() => {
        fetchFilters()
    }, [fetchFilters]);

    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const searchText = useFiltersStore.getState().searchText

        filterAlbums(searchText, selectedGenre, selectedFormat)
            .then(() => {
                setIsFiltersVisible(false)
            })
            .catch(console.error)
    }

    const handleResetForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setSelectedFormat('')
        setSelectedGenre('')
    }

    return (
        <div className={`mt-6 flex-col transition-all duration-500 max-h-0 ${isFiltersVisible ? 'max-h-40 h-fit opacity-100' : 'overflow-hidden opacity-0'}`}>
            <form className="flex items-end gap-8" onSubmit={handleSubmitForm} onReset={handleResetForm}>
                <div className="flex gap-4">
                    <Select placeholder="Choose genre" label="Genre" selectedOption={selectedGenre} setSelectedOption={setSelectedGenre}>
                        {genres && genres.map(genre => (
                            <Option key={genre.id} value={genre.name}>{genre.name}</Option>
                        ))}
                    </Select>
                    <Select placeholder="Choose format" label="Format" selectedOption={selectedFormat} setSelectedOption={setSelectedFormat}>
                        {formats && formats.map(format => (
                            <Option key={format.id} value={format.name}>{format.name}</Option>
                        ))}
                    </Select>
                </div>
                <div className="flex gap-2">
                    <Button text="Save filters" size="medium" type="submit"/>
                    <Button text="Reset filters" size="medium" type="reset"/>
                </div>
            </form>
        </div>
    );
};

export default Filters;
