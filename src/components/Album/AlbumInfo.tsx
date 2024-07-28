import Loader from '@/components/Loader/Loader.tsx';
import AlbumMeta from '@/components/Album/AlbumMeta.tsx';
import AlbumDetails from '@/components/Album/AlbumDetails.tsx';
import AlbumCover from '@/components/Album/AlbumCover.tsx';
import AlbumInfoColumn from '@/components/Album/AlbumInfoColumn.tsx';
import AlbumInfoGrid from '@/components/Album/AlbumInfoGrid.tsx';
import { useParams } from 'react-router-dom';
import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import { useEffect } from 'react';

const AlbumInfo = () => {
  const { albumId } = useParams();
  const getAlbum = useAlbumsStore(state => state.getAlbum);
  const isLoading = useAlbumsStore(state => state.isLoading);

  useEffect(() => {
    if (albumId) {
      getAlbum(albumId).catch(console.error);
    }
  }, [getAlbum, albumId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="pb-10">
      <div className="relative bg-screen-default w-full top-[100px] flex justify-center h-4/5">
        <AlbumInfoGrid>
          <AlbumInfoColumn>
            <AlbumCover />
            <AlbumMeta />
          </AlbumInfoColumn>
          <AlbumInfoColumn>
            <AlbumDetails />
          </AlbumInfoColumn>
        </AlbumInfoGrid>
      </div>
    </section>
  );
};

export default AlbumInfo;