import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import Loader from '@/components/Loader/Loader.tsx';

const AlbumInfo = () => {
  const { albumId } = useParams()
  const { getAlbum } = useAlbumsStore()
  const { selectedAlbum } = useAlbumsStore()
  const { isLoading } = useAlbumsStore()


  useEffect(() => {
    if (albumId) getAlbum(albumId)
  }, [])


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