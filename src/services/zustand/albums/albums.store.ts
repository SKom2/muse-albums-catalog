import { create } from 'zustand';
import { IAlbumsState } from '@/services/zustand/albums/albums.types.ts';
import { albumsService } from '@/services/zustand/albums/albums.service.ts';
import {createJSONStorage, persist} from "zustand/middleware";

export const INITIAL_PAGE = 0

const useAlbumsStore = create<IAlbumsState>()(
    persist(
        (set, get) => ({
            albums: null,
            selectedAlbum: null,
            amountOfAlbums: null,
            page: INITIAL_PAGE,
            isLoading: false,
            message: '',

            fetchAlbums: async (searchText = '', genre = '', format = '', nextPage = false) => {
                set({ isLoading: true, message: '', page: nextPage ? get().page + 1 : INITIAL_PAGE});
                try {
                    const response = await albumsService.getAlbums(get().page, searchText, genre, format);

                    if (response) {
                        const updatedAlbums = nextPage
                            ? [...(get().albums || []), ...response.albums]
                            : response.albums

                        set({
                            albums: updatedAlbums,
                            amountOfAlbums: response.count,
                        });

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
        }),
        {
            name: 'albums-storage',
            storage: createJSONStorage(() => localStorage),
        },
    )
)

export default useAlbumsStore;