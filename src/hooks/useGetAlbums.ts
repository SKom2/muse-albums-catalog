import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import { useEffect } from 'react';

const useGetAlbums = () => {
  const nextPage = useAlbumsStore(state => state.nextPage)
  const albums = useAlbumsStore(state => state.albums)
  const amountOfAlbums = useAlbumsStore(state => state.amountOfAlbums)
  const isLoading = useAlbumsStore(state => state.isLoading)
  const page = useAlbumsStore(state => state.page)
  const getAlbums = useAlbumsStore(state => state.getAlbums)

  useEffect(() => {
    getAlbums()
      .then(console.log)
      .catch(console.error);
  }, [getAlbums]);

  return {
    nextPage,
    albums,
    amountOfAlbums,
    isLoading,
    page,
  }
}

export default useGetAlbums;