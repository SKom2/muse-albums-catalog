import Button from "@/ui/Button.tsx";
import useAlbumsStore, {INITIAL_PAGE} from "@/services/zustand/albums/albums.store.ts";
import Loader from "@/components/Loader/Loader.tsx";
import AlbumsGrid from "@/components/Albums/AlbumsGrid.tsx";
import { FC } from "react";

const DisplayAlbums: FC<{ isFavoritesList: boolean }> = ({ isFavoritesList }) => {
  const albums = useAlbumsStore(state => isFavoritesList ? state.favoriteAlbums : state.albums);
  const totalAlbums = useAlbumsStore(state => isFavoritesList ? state.totalFavoriteAlbums : state.totalAlbums);
  const page = useAlbumsStore(state => state.page);
  const isLoading = useAlbumsStore(state => state.isLoading);
  const fetchNextPage = useAlbumsStore(state => isFavoritesList ? state.fetchFavoriteAlbums : state.fetchAlbums);

  if (page === INITIAL_PAGE && isLoading) {
    return <Loader />;
  }

  return (
      <>
        {!albums || albums.length === 0 ? (
            <p className="text-center heading-2 text-content-primary mt-10">
              No albums found
            </p>
        ) : (
            <div className=" flex flex-col w-full items-center gap-10 pb-10 relative">
              <AlbumsGrid albums={albums} />
              {totalAlbums !== albums.length && (
                  <Button
                      size="large"
                      onClick={() => fetchNextPage(true)}
                  >
                    {isLoading ? "Loading..." : "Load more"}
                  </Button>
              )}
            </div>
        )}
      </>
  );
};

export default DisplayAlbums;
