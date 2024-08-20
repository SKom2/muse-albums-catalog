import {IMode} from "@/components/Album/AlbumContainer.tsx";

export interface IAlbumsState {
  albums: IAlbum[] | null,
  selectedAlbum: IAlbum | null,
  newAlbum: INewAlbum,
  amountOfAlbums: number | null,
  page: number,

  isLoading: boolean,
  isCoverUpdating: boolean,

  getAlbum: (album_id: string) => Promise<void>
  fetchAlbums: (resetAlbums?: boolean) => Promise<void>;

  uploadAlbumCover: (file: File, mode: IMode) => Promise<void>

  submitAlbumChanges: (albumData: IAlbumFormFieldsValues, albumId?: string) => Promise<void>
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
