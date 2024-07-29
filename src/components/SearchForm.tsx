import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import IconButton from '@/ui/IconButton.tsx';
import SearchIcon from '@/assets/icons/SearchIcon.tsx';
import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import { debounce } from 'lodash';
import Input from '@/ui/Input.tsx';

const SearchForm = () => {
  const { register, handleSubmit, watch } = useForm()
  const searchAlbums = useAlbumsStore(state => state.searchAlbums)

  const handleSearchSubmit: SubmitHandler<FieldValues>  = async (value) => {
    await searchAlbums(value.search).catch(console.error)
  }

  const debouncedSearch = debounce(handleSearchSubmit, 500)

  watch((value) => {
      debouncedSearch(value)
  })

  return (
    <form className="flex gap-2 w-1/6" onSubmit={handleSubmit(handleSearchSubmit)}>
      <Input register={register} name="search" placeholder="Search albums" />
      <IconButton size="medium" type="submit">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchForm;