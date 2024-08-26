import {IMode} from "@/components/Album/AlbumContainer.tsx";

export interface IAlbumsState {
  albums: IAlbum[] | null,
  totalAlbums: number | null,

  favoriteAlbums: IAlbum[] | null,
  totalFavoriteAlbums: number | null,

  selectedAlbum: IAlbum | null,
  newAlbum: INewAlbum,

  page: number,
  favoritesPage: number,
  album_per_page: number,

  isLoading: boolean,
  isCoverUpdating: boolean,

  fetchAlbumById: (album_id: string) => Promise<void>
  fetchAlbums: (nextPage?: boolean) => Promise<void>;
  fetchFavoriteAlbums: (nextPage?: boolean) => Promise<void>;

  deleteAlbum: (album_id: number) => Promise<void>

  addAlbumToFavorites: (album: IAlbum) => Promise<void>
  removeAlbumFromFavorites: (album_id: number) => Promise<void>

  uploadAlbumCover: (file: File, mode: IMode) => Promise<void>
  saveAlbum: (albumData: IAlbumFormFieldsValues, albumId?: string) => Promise<void>
}

export interface IAlbumFormFieldsValues {
  name?: string,
  date_of_issue?: Date,
  number_of_tracks?: number,
  format_name?: string,
  genre_name?: string,
  cover?: File,
  artist_name?: string,
  description?: string,
  user_id?: string
}

export interface IAlbum {
  id: number,
  created_at: Date,
  date_of_issue: Date,
  number_of_tracks: number,
  user_id: number,
  name: string,
  description: string,
  artist_name: string,
  format_name: string,
  genre_name: string,
  cover: File,
  isFavorite: boolean,
}

export interface INewAlbum {
  id?: number,
  created_at?: Date,
  date_of_issue: Date | null,
  number_of_tracks: number | null,
  user_id?: number,
  name: string,
  description: string,
  artist_name: string,
  format_name: string,
  genre_name: string,
  cover: File | null,
}
