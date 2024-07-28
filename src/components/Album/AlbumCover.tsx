import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';

const AlbumCover = () => {
  const selectedAlbum = useAlbumsStore(state => state.selectedAlbum)

  return <img src={selectedAlbum?.cover} alt="Album Cover" className="w-full object-cover shadow-2xl" />

};

export default AlbumCover;