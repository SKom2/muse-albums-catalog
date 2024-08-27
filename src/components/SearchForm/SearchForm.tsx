import { useForm } from 'react-hook-form';
import IconButton from '@/ui/IconButton.tsx';
import SearchIcon from '@/assets/icons/SearchIcon.tsx';
import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import { debounce } from 'lodash';
import Input from '@/ui/Input.tsx';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Paths } from "@/routes/routes.types.ts";

const SearchForm = () => {
    const { register, handleSubmit, watch, setValue} = useForm();
    const location = useLocation();

    const setSearchText = useFiltersStore(state => state.setSearchText);

    const handleSearchSubmit = async (searchAlbums: any) => {
        await searchAlbums();
    };

    const debouncedSearch = debounce((searchAlbums) => {
        handleSearchSubmit(searchAlbums);
    }, 500);

    useEffect(() => {
        const isFavorites = location.pathname === Paths.FAVORITE_ALBUMS;
        const searchAlbums = isFavorites ? useAlbumsStore.getState().fetchFavoriteAlbums : useAlbumsStore.getState().fetchAlbums;

        setValue("search", '');
        setSearchText('');

        const subscription = watch((value) => {
            setSearchText(value.search);
            debouncedSearch(searchAlbums);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [location.pathname, watch]);

    return (
        <form onSubmit={handleSubmit(handleSearchSubmit)}>
            <div className="flex gap-2 items-center">
                <Input register={register} name="search" placeholder="Search albums" />
                <IconButton size="medium" type="submit">
                    <SearchIcon />
                </IconButton>
            </div>
        </form>
    );
};

export default SearchForm;
