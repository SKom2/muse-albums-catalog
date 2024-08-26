import { FC, FormEvent, useEffect } from "react";
import Select from "@/components/Select/Select.tsx";
import Button from "@/ui/Button.tsx";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import Options from "@/components/Select/Options.tsx";
import { useLocation } from "react-router-dom";
import { Paths } from "@/routes/routes.types.ts";

const Filters: FC<{ isFiltersVisible: boolean, setIsFiltersVisible: (isVisible: boolean) => void }> = ({ isFiltersVisible, setIsFiltersVisible }) => {
    const selectedGenre = useFiltersStore(state => state.selectedGenre);
    const setSelectedGenre = useFiltersStore(state => state.setSelectedGenre);

    const selectedFormat = useFiltersStore(state => state.selectedFormat);
    const setSelectedFormat = useFiltersStore(state => state.setSelectedFormat);
    const setSearchText = useFiltersStore(state => state.setSearchText);

    const genres = useFiltersStore(state => state.genres);
    const formats = useFiltersStore(state => state.formats);

    const location = useLocation();

    const getFilterAlbums = () => {
        return location.pathname === Paths.FAVORITE_ALBUMS
            ? useAlbumsStore.getState().fetchFavoriteAlbums
            : useAlbumsStore.getState().fetchAlbums;
    };

    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const filterAlbums = getFilterAlbums();

        filterAlbums()
            .then(() => {
                setIsFiltersVisible(false);
            })
            .catch(console.error);
    };

    const handleResetForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const filterAlbums = getFilterAlbums();

        setSelectedFormat('');
        setSelectedGenre('');
        setSearchText('');

        filterAlbums()
            .then(() => {
                setIsFiltersVisible(false);
            })
            .catch(console.error);
    };

    useEffect(() => {
        setSelectedFormat('');
        setSelectedGenre('');
        setSearchText('');
    }, [location.pathname]);

    return (
        <div className={`flex-col transition-all duration-500 max-h-0 max-md:w-full ${isFiltersVisible ? 'max-h-40 h-fit opacity-100 mt-6' : 'overflow-hidden opacity-0'}`}>
            <form className="flex items-end gap-8 max-md:flex-col max-md:gap-4" onSubmit={handleSubmitForm} onReset={handleResetForm}>
                <div className="flex gap-2 max-md:w-full">
                    <Select color="bg-screen-default" placeholder="Choose genre" label="Genre" selectedOption={selectedGenre} setSelectedOption={setSelectedGenre}>
                        <Options options={genres} />
                    </Select>
                    <Select color="bg-screen-default" placeholder="Choose format" label="Format" selectedOption={selectedFormat} setSelectedOption={setSelectedFormat}>
                        <Options options={formats} />
                    </Select>
                </div>
                <div className="flex gap-2 max-md:w-full">
                    <Button size="medium" type="submit">Save filters</Button>
                    <Button size="medium" type="reset">Reset filters</Button>
                </div>
            </form>
        </div>
    );
};

export default Filters;
