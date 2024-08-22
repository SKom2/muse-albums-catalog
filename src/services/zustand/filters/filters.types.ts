
export interface IFiltersState {
    searchText: string;

    genres: IGenre[] | null,
    selectedGenre: string;

    formats: IFormat[] | null;
    selectedFormat: string;

    isLoading: boolean;

    setSearchText: (text: string) => void;

    getGenres: () => Promise<void>
    setSelectedGenre: (selectedGenre: string) => void

    getFormats: () => Promise<void>
    setSelectedFormat: (selectedFormat: string) => void
}

export interface IGenre {
    id: number,
    name: string,
}

export interface IFormat {
    id: number,
    name: string,
}