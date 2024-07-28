import { create } from 'zustand';
import { IAlbumsState } from '@/services/zustand/albums/albums.types.ts';
import { devtools } from 'zustand/middleware';
import { albumsService } from '@/services/zustand/albums/albums.service.ts';

export const INITIAL_PAGE = 0

const useAlbumsStore = create<IAlbumsState>()(
  devtools(
    (set, get) => ({
      albums: null,
      selectedAlbum: null,
      amountOfAlbums: null,
      page: INITIAL_PAGE,
      isLoading: false,
      message: '',

      getAlbums: async () => {
        set({ isLoading: true, message: '', page: INITIAL_PAGE});
        try {
          const response = await albumsService.getAlbums(INITIAL_PAGE);

          if (response) {
            set({ albums: response.albums, amountOfAlbums: response.count });
            return response
          }
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          set({ message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      getAlbum: async (album_id: string) => {
        set({ isLoading: true, message: '' });
        try {
          const response = await albumsService.getAlbum(album_id);

          if (response) {
            set({ selectedAlbum: response })
            return response
          }
        }
        catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          set({ message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      nextPage: async () => {
        try {
          set({ isLoading: true, message: '', page: get().page + 1});
          const response = await albumsService.getAlbums(get().page);

          if (response) {
            const updatedAlbums = [...get().albums || [], ...response.albums];
            set({ albums: updatedAlbums, amountOfAlbums: response.count });
            return response;
          }
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          set({ message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    })
  )
)

export default useAlbumsStore;