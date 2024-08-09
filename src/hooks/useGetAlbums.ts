import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import { useEffect } from 'react';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";

const useGetAlbums = () => {
  const nextPage = useAlbumsStore(state => state.fetchAlbums)
  const albums = useAlbumsStore(state => state.albums)
  const amountOfAlbums = useAlbumsStore(state => state.amountOfAlbums)
  const isLoading = useAlbumsStore(state => state.isLoading)
  const page = useAlbumsStore(state => state.page)
  const fetchAlbums = useAlbumsStore(state => state.fetchAlbums)
  const genre = useFiltersStore(state => state.selectedGenre)
  const format = useFiltersStore(state => state.selectedFormat)
  const searchText = useFiltersStore(state => state.searchText)

  useEffect(() => {
    fetchAlbums(searchText, genre, format)
        .catch(console.error);
  }, [fetchAlbums, genre, format]);

  return {
    nextPage,
    albums,
    amountOfAlbums,
    isLoading,
    page,
    genre,
    format,
    searchText
  }
}

export default useGetAlbums;