import DisplayAlbums from '@/components/Albums/AlbumsList.tsx';
import Button from '@/ui/Button.tsx';
import Loader from '@/components/Loader/Loader.tsx';
import useGetAlbums from '@/hooks/useGetAlbums.ts';
import { INITIAL_PAGE } from '@/services/zustand/albums/albums.store.ts';

const Albums = () => {
  const {
    page,
    nextPage,
    isLoading,
    albums,
    amountOfAlbums,
    format,
    genre,
    searchText
  } = useGetAlbums()

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
          {amountOfAlbums !== albums.length && (
            <Button
              text={isLoading ? "Loading..." : "Load more"}
              size="large"
              onClick={() => nextPage(searchText, genre, format, true)}
            />
          )}
        </>
      )}
    </section>
  );
};

export default Albums;
