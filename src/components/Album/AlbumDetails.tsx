import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';

const AlbumDetails = () => {
  const selectedAlbum = useAlbumsStore(state => state.selectedAlbum)

  return (
    <div className="h-full pt-20 flex flex-col gap-2 items-start justify-start">
      <h1 className="heading">{selectedAlbum?.name}</h1>
      <p className="paragraph text-content-secondary">{selectedAlbum?.artist_name}</p>
    </div>
  );
};

export default AlbumDetails;