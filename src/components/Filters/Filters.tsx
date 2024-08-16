import {FC, FormEvent} from "react";
import Select from "@/components/Select/Select.tsx";
import Button from "@/ui/Button.tsx";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import Options from "@/components/Select/Options.tsx";

const Filters: FC<{ isFiltersVisible: boolean, setIsFiltersVisible: (isVisible: boolean) => void }> = ({ isFiltersVisible, setIsFiltersVisible }) => {
    const selectedGenre = useFiltersStore(state => state.selectedGenre);
    const setSelectedGenre = useFiltersStore(state => state.setSelectedGenre);

    const selectedFormat = useFiltersStore(state => state.selectedFormat);
    const setSelectedFormat = useFiltersStore(state => state.setSelectedFormat);

    const genres = useFiltersStore(state => state.genres);
    const formats = useFiltersStore(state => state.formats);

    const filterAlbums = useAlbumsStore(state => state.fetchAlbums)

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
                    <Select color="bg-screen-default" placeholder="Choose genre" label="Genre" selectedOption={selectedGenre} setSelectedOption={setSelectedGenre}>
                        <Options options={genres} />
                    </Select>
                    <Select color="bg-screen-default" placeholder="Choose format" label="Format" selectedOption={selectedFormat} setSelectedOption={setSelectedFormat}>
                        <Options options={formats} />
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
