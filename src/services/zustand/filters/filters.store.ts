import {create} from "zustand";
import {IFiltersState} from "@/services/zustand/filters/filters.types.ts";
import filtersService from "@/services/zustand/filters/filters.service.ts";
import {createJSONStorage, persist} from "zustand/middleware";

const useFiltersStore = create<IFiltersState>()(
    persist(
        (set) => ({
            genres: null,
            formats: null,

            selectedGenre: '',
            selectedFormat: '',
            searchText: '',

            isLoading: false,

            setSearchText: (text: string) => set({ searchText: text }),

            getGenres: async () => {
                set({ isLoading: true });
                try {

                    const genresFromStorage = JSON.parse(localStorage.getItem('filters-storage') || '').state.genres;
                    if (genresFromStorage) {
                        set({ genres: genresFromStorage });
                        return genresFromStorage;
                    }

                    const genres = await filtersService.getGenres()
                    if (genres) {
                        set({ genres });
                        return genres
                    }

                } catch (error: any) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw "Failed to get genres: " + message;
                } finally {
                    set({isLoading: false});
                }
            },

            getFormats: async () => {
                set({ isLoading: true });
                try {
                    const formatsFromStorage = JSON.parse(localStorage.getItem('filters-storage') || '').state.formats;
                    if (formatsFromStorage) {
                        set({ formats: formatsFromStorage });
                        return formatsFromStorage;
                    }

                    const formats = await filtersService.getFormats()

                    if (formats) {
                        set({ formats });
                        return formats;
                    }
                } catch (error: any) {
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    throw "Failed to get formats: " + message;
                } finally {
                    set({isLoading: false});
                }
            },

            setSelectedGenre: (selectedGenre: string) => set({ selectedGenre }),

            setSelectedFormat: (selectedFormat: string) => set({ selectedFormat }),
        }),
        {
            name: 'filters-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ genres: state.genres, formats: state.formats }),
        },
    )
)

export default useFiltersStore;