import DisplayAlbums from '@/components/Albums/DisplayAlbums.tsx';
import useAlbumsStore from '@/services/zustand/albums/albums.store.ts';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import { FC, useEffect } from "react";
import useWindowDimensions from "@/hooks/useDimensions.ts";

const AlbumGallery: FC<{ isFavoritesPage?: boolean }> = ({ isFavoritesPage = false }) => {

  const albums = useAlbumsStore(state => isFavoritesPage ? state.favoriteAlbums : state.albums);
  const fetchAlbums = useAlbumsStore(state => isFavoritesPage ? state.fetchFavoriteAlbums : state.fetchAlbums);

  const genre = useFiltersStore(state => state.selectedGenre);
  const format = useFiltersStore(state => state.selectedFormat);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width && width > 1550) {
      useAlbumsStore.setState({ album_per_page: 5 });
    } else if (width && width < 1550 && width >= 1240) {
      useAlbumsStore.setState({ album_per_page: 8 });
    } else if (width && width < 1240) {
      useAlbumsStore.setState({ album_per_page: 6 });
    }
  }, [width]);

  useEffect(() => {
    if (width && !albums) {
      fetchAlbums();
    }
  }, [fetchAlbums, genre, format, width, albums]);

  return (
      <section className="min-h-60">
        <DisplayAlbums isFavoritesList={isFavoritesPage} />
      </section>
  );
};

export default AlbumGallery;
