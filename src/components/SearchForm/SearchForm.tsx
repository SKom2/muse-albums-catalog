import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import IconButton from '@/ui/IconButton.tsx';
import SearchIcon from '@/assets/icons/SearchIcon.tsx';
import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import { debounce } from 'lodash';
import Input from '@/ui/Input.tsx';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import {useEffect} from "react";

const SearchForm = () => {
    const { register, handleSubmit, watch} = useForm()
    const searchAlbums = useAlbumsStore(state => state.fetchAlbums)
    const setSearchText = useFiltersStore(state => state.setSearchText);

    const handleSearchSubmit: SubmitHandler<FieldValues>  = async (value) => {
        const selectedGenre = useFiltersStore.getState().selectedGenre
        const selectedFormat = useFiltersStore.getState().selectedFormat

        try {
            await searchAlbums(value.search, selectedGenre, selectedFormat);
        } catch (error) {
            console.error(error);
        }
    };

    const debouncedSearch = debounce(handleSearchSubmit, 500)

    useEffect(() => {
        const subscription = watch((value) => {
            debouncedSearch(value);
            setSearchText(value.search)
        });
        return () => subscription.unsubscribe();
    }, [watch, debouncedSearch]);

    return (
        <form className="flex gap-2 w-1/6 items-center" onSubmit={handleSubmit(handleSearchSubmit)}>
          <Input register={register} name="search" placeholder="Search albums" />
          <IconButton size="medium" type="submit">
            <SearchIcon />
          </IconButton>
        </form>
    );
};

export default SearchForm;