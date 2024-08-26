import { create } from 'zustand';
import {IAlbum, IAlbumFormFieldsValues, IAlbumsState} from '@/services/zustand/albums/albums.types.ts';
import { albumsService } from '@/services/zustand/albums/albums.service.ts';
import {createJSONStorage, persist} from "zustand/middleware";
import {IMode} from "@/components/Album/AlbumContainer.tsx";

export const INITIAL_PAGE = 0

const useAlbumsStore = create<IAlbumsState>()(
    persist(
        (set, get) => ({
            albums: null,
            totalAlbums: null,

            favoriteAlbums: null,
            totalFavoriteAlbums: null,

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

            page: INITIAL_PAGE,
            favoritesPage: INITIAL_PAGE,
            album_per_page: 5,

            isLoading: false,
            isCoverUpdating: false,

            fetchAlbums: async (nextPage = false) => {
                set({ isLoading: true, page: nextPage ? get().page + 1 : INITIAL_PAGE});
                try {
                    const response =  await albumsService.fetchAlbums();

                    if (response) {
                        const updatedAlbums = nextPage
                            ? [...(get().albums || []), ...response.albums]
                            : response.albums

                        set({
                            albums: updatedAlbums,
                            totalAlbums: response.count,
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

            fetchFavoriteAlbums: async (nextPage = false) => {
                set({ isLoading: true, favoritesPage: nextPage ? get().favoritesPage + 1 : INITIAL_PAGE});
                try {
                    const response =  await albumsService.fetchFavoriteAlbums();

                    if (response) {
                        const updatedAlbums = nextPage
                            ? [...(get().favoriteAlbums || []), ...response.albums]
                            : response.albums

                        set({
                            favoriteAlbums: updatedAlbums,
                            totalFavoriteAlbums: response.count,
                        });
                    }
                } catch (error: any) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw "Failed to get albums: " + message;
                } finally {
                    set({ isLoading: false });
                }
            },

            fetchAlbumById: async (album_id: string) => {
                set({ isLoading: true });
                try {
                  const response = await albumsService.fetchAlbumById(album_id);

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

            deleteAlbum: async (album_id: number) => {
                const updateState = (state: IAlbumsState) => ({
                    favoriteAlbums: state.favoriteAlbums?.filter(album => album.id !== album_id) || [],
                    albums: state.albums?.filter(album => album.id !== album_id) || [],
                    totalFavoriteAlbums: (state.totalFavoriteAlbums || 0) - 1,
                });

                const restoreState = (state: IAlbumsState): Partial<IAlbumsState> => {
                    const albumToRestore = state.albums?.find((album: IAlbum) => album.id === album_id);

                    return {
                        favoriteAlbums: albumToRestore
                            ? [...(state.favoriteAlbums || []), { ...albumToRestore, isFavorite: true }]
                            : state.favoriteAlbums || [],
                        albums: state.albums?.map(album =>
                            album.id === album_id ? { ...album, isFavorite: true } : album
                        ) || [],
                        totalFavoriteAlbums: (state.totalFavoriteAlbums || 0) + 1,
                    };
                };

                try {
                    set((state) => updateState(state));

                    await albumsService.deleteAlbumFromFavorites(album_id);
                    await albumsService.deleteAlbum(album_id);
                } catch (error: any) {
                    set((state: IAlbumsState) => restoreState(state));

                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw new Error("Failed to delete album: " + message);
                }
            },

            addAlbumToFavorites: async (album: IAlbum) => {
                const album_id = album.id;

                const updateState = (state: IAlbumsState) => ({
                    favoriteAlbums: state.favoriteAlbums
                        ? [...state.favoriteAlbums, { ...album, isFavorite: true }]
                        : [{ ...album, isFavorite: true }],
                    albums: state.albums?.map((album: IAlbum) =>
                        album.id === album_id ? { ...album, isFavorite: true } : album
                    ),
                    totalFavoriteAlbums: (state.totalFavoriteAlbums || 0) + 1,
                });

                const restoreState = (state: IAlbumsState): Partial<IAlbumsState> => ({
                    favoriteAlbums: state.favoriteAlbums?.filter(album => album.id !== album_id) || [],
                    albums: state.albums?.map(album =>
                        album.id === album_id ? { ...album, isFavorite: false } : album
                    ),
                    totalFavoriteAlbums: (state.totalFavoriteAlbums || 1) - 1,
                });

                try {
                    set(state => updateState(state));

                    await albumsService.insertAlbumToFavorites(album_id);
                } catch (error: any) {
                    set(state => restoreState(state));

                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw new Error("Failed to add album to favorites: " + message);
                }
            },

            removeAlbumFromFavorites: async (album_id: number) => {
                const updateState = (state: IAlbumsState) => ({
                    favoriteAlbums: state.favoriteAlbums?.filter(album => album.id !== album_id) || [],
                    albums: state.albums?.map(album =>
                        album.id === album_id ? { ...album, isFavorite: false } : album
                    ),
                    totalFavoriteAlbums: (state.totalFavoriteAlbums || 0) - 1,
                });

                const restoreState = (state: IAlbumsState) => {
                    const albumToRestore = state.albums?.find((album: IAlbum) => album.id === album_id);

                    return {
                        favoriteAlbums: albumToRestore
                            ? [...(state.favoriteAlbums || []), { ...albumToRestore, isFavorite: true }]
                            : state.favoriteAlbums || [],
                        albums: state.albums?.map(album =>
                            album.id === album_id ? { ...album, isFavorite: true } : album
                        ) || [],
                        totalFavoriteAlbums: (state.totalFavoriteAlbums || 0) + 1,
                    };
                };

                try {
                    set(state => updateState(state));

                    await albumsService.deleteAlbumFromUserFavorites(album_id);
                } catch (error: any) {
                    set(state => restoreState(state));

                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw new Error("Failed to remove album from favorites: " + message);
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

            saveAlbum: async (data: IAlbumFormFieldsValues, albumId?: string) => {
                try {
                    if (albumId) {
                        await albumsService.updateAlbumFields(albumId, data);
                    } else {
                        const album = await albumsService.createNewAlbum(data);
                        console.log(album)

                        set((state: IAlbumsState) => ({
                            albums: [...(state.albums || []), { ...album[0], isFavorite: false }],
                        }));
                        console.log(get().albums)
                    }
                } catch (error: any) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw new Error("Failed to submit album changes: " + message);
                }
            },
        }),
        {
            name: 'albums-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: state => ({
                totalAlbums: state.totalAlbums,
                totalFavoriteAlbums: state.totalFavoriteAlbums,
            }),
        }
    )
)

export default useAlbumsStore;