import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import IconButton from '@/ui/IconButton.tsx';
import SearchIcon from '@/assets/icons/SearchIcon.tsx';
import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import { debounce } from 'lodash';
import Input from '@/ui/Input.tsx';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import {useEffect} from "react";

const SearchForm = () => {
    const { register, handleSubmit, watch, setValue} = useForm()
    const searchAlbums = useAlbumsStore(state => state.fetchAlbums)
    const setSearchText = useFiltersStore(state => state.setSearchText);

    const handleSearchSubmit: SubmitHandler<FieldValues>  = async (value) => {
        setSearchText(value.search);
        try {
            await searchAlbums();
        } catch (error) {
            console.error(error);
        }
    };

    const debouncedSearch = debounce((value) => {
        handleSearchSubmit(value);
    }, 500)

    useEffect(() => {
        setValue("search", '')
        const subscription = watch((value) => {
            debouncedSearch(value);
        });

        return () => {
            subscription.unsubscribe();
        }
    }, [watch]);

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