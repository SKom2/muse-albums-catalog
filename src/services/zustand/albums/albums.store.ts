import { create } from 'zustand';
import {IAlbumFormFieldsValues, IAlbumsState} from '@/services/zustand/albums/albums.types.ts';
import { albumsService } from '@/services/zustand/albums/albums.service.ts';
import {createJSONStorage, persist} from "zustand/middleware";
import {IMode} from "@/components/Album/AlbumContainer.tsx";

export const INITIAL_PAGE = 0

const useAlbumsStore = create<IAlbumsState>()(
    persist(
        (set, get) => ({
            albums: null,
            selectedAlbum: null,
            newAlbum: {
                date_of_issue: null,
                number_of_tracks: null,
                name: '',
                description: '',
                artist_name: '',
                format_name: '',
                genre_name: '',
                cover: null,
            },
            amountOfAlbums: null,
            page: INITIAL_PAGE,

            isLoading: false,
            isCoverUpdating: false,

            fetchAlbums: async (searchText = '', genre = '', format = '', nextPage = false) => {
                set({ isLoading: true, page: nextPage ? get().page + 1 : INITIAL_PAGE});
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
                } catch (error: any) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw "Failed to get albums: " + message;
                } finally {
                    set({ isLoading: false });
                }
            },

            getAlbum: async (album_id: string) => {
                set({ isLoading: true });
                try {
                  const response = await albumsService.getAlbum(album_id);
                  if (response) {
                    set({ selectedAlbum: response })
                    return response
                  }
                }
                catch (error: any) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw "Failed to get album: " + message
                } finally {
                  set({ isLoading: false });
                }
            },

            uploadAlbumCover: async (file: File, mode: IMode) => {
                set({ isCoverUpdating: true });
                try {
                    const coverUrl = await albumsService.uploadAlbumCoverToStorage(file)

                    if (coverUrl) {
                        if (mode === 'create') {
                            set(state => ({
                                newAlbum: { ...state.newAlbum, cover: coverUrl }
                            }));
                        } else {
                            set(state => ({
                                selectedAlbum: state.selectedAlbum ? { ...state.selectedAlbum, cover: coverUrl } : null
                            }));
                        }
                    }
                } catch (error: any) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw "Failed to upload album cover: " + message
                } finally {
                    set({ isCoverUpdating: false });
                }
            },

            submitAlbumChanges: async (data: IAlbumFormFieldsValues, albumId?: string) => {
                try {
                    if (albumId) {
                        await albumsService.updateAlbumFields(albumId, data);
                    } else {
                        await albumsService.createNewAlbum(data)
                    }
                } catch (error: any) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw "Failed to submit album changes: " + message
                }
            }
        }),
        {
            name: 'albums-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ albums: state.albums, amountOfAlbums: state.amountOfAlbums }),
        },
    )
)

export default useAlbumsStore;