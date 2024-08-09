import {create} from "zustand";
import {IFiltersState} from "@/services/zustand/filters/filters.types.ts";
import filtersService from "@/services/zustand/filters/filters.service.ts";

const useFiltersStore = create<IFiltersState>()(
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
                const response = await filtersService.getGenres()

                if (response) {
                    set({ genres: response });
                    return response
                }
            } catch (error) {
                console.error("Failed to fetch genres:", error);
            } finally {
                set({isLoading: false});
            }
        },

        getFormats: async () => {
            set({ isLoading: true });
            try {
                const response = await filtersService.getFormats()

                if (response) {
                    set({ formats: response });
                    return response
                }
            } catch (error) {
                console.error("Failed to fetch formats:", error);
            } finally {
                set({isLoading: false});
            }
        },

        setSelectedGenre: (selectedGenre: string) => set({ selectedGenre }),

        setSelectedFormat: (selectedFormat: string) => set({ selectedFormat }),
    })
)

export default useFiltersStore;