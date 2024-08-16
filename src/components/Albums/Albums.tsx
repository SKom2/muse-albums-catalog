import DisplayAlbums from '@/components/Albums/AlbumsList.tsx';
import Button from '@/ui/Button.tsx';
import Loader from '@/components/Loader/Loader.tsx';
import useAlbumsStore, { INITIAL_PAGE } from '@/services/zustand/albums/albums.store.ts';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import {useEffect} from "react";

const Albums = () => {
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

  if (page === INITIAL_PAGE && isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col w-full items-center gap-10 pb-10">
      {!albums || albums.length === 0 ? (
        <p className="text-center heading-2 text-content-primary mt-10">
          No albums found
        </p>
      ) : (
        <>
          <DisplayAlbums albums={albums} />
          {
            amountOfAlbums !== albums.length && (
                <Button
                    text={isLoading ? "Loading..." : "Load more"}
                    size="large"
                    onClick={() => nextPage(searchText, genre, format, true)}
                />
              )
          }
        </>
      )}
    </section>
  );
};

export default Albums;
