import DisplayAlbums from '@/components/Albums/DisplayAlbums.tsx';
import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import { FC, useEffect } from "react";
import useWindowDimensions from "@/hooks/useDimensions.ts";

const AlbumGallery: FC<{ isFavoritesPage?: boolean }> = ({ isFavoritesPage = false }) => {
  const fetchAlbums = useAlbumsStore(state => isFavoritesPage ? state.fetchFavoriteAlbums : state.fetchAlbums);
  const { width } = useWindowDimensions();

  useEffect(() => {
    useAlbumsStore.setState({ album_per_page: 6 });
    if (width && width < 1800) {
      useAlbumsStore.setState({ album_per_page: 5 });
    } else if (width && width < 1550 && width >= 1240) {
      useAlbumsStore.setState({ album_per_page: 8 });
    } else if (width && width < 1240) {
      useAlbumsStore.setState({ album_per_page: 6 });
    }
  }, [width]);

  useEffect(() => {
    if (width)
      fetchAlbums();
  }, [fetchAlbums, width]);

  return (
      <section className="min-h-60">
        <DisplayAlbums isFavoritesList={isFavoritesPage} />
      </section>
  );
};

export default AlbumGallery;
