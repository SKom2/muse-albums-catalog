import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import Loader from '@/components/Loader/Loader.tsx';

const AlbumInfo = () => {
  const { albumId } = useParams()
  const getAlbum = useAlbumsStore(state => state.getAlbum)
  const selectedAlbum = useAlbumsStore(state => state.selectedAlbum)
  const isLoading = useAlbumsStore(state => state.isLoading)

  useEffect(() => {
    if (albumId)
      getAlbum(albumId)
        .catch(console.error)
  }, [getAlbum, albumId])

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {selectedAlbum?.name}
    </div>
  );
};

export default AlbumInfo;