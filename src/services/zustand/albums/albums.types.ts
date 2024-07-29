export interface IAlbumsState {
  albums: IAlbum[] | null,
  selectedAlbum: IAlbum | null,
  amountOfAlbums: number | null,
  page: number,
  isLoading: boolean,
  message: string,

  getAlbums: () => Promise<void>
  getAlbum: (album_id: string) => Promise<void>
  nextPage: () => Promise<void>;
  searchAlbums: (text: string) => Promise<void>;
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
  cover: string,
}

