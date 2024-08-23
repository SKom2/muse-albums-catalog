import supabase from '@/services/api/supabaseClient.ts';
import { getRange } from '@/services/zustand/albums/albums.helpers.ts';
import {INITIAL_PAGE} from "@/services/zustand/albums/albums.store.ts";
import {uuid} from "@supabase/supabase-js/dist/main/lib/helpers";
import {IAlbumFormFieldsValues} from "@/services/zustand/albums/albums.types.ts";
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";

export const albumsService = {
  async getAlbums(page: number = INITIAL_PAGE, album_per_page: number): Promise<any> {
    const { from, to } = getRange(page, album_per_page)
    let query = supabase
      .from('albums')
      .select('*',  { count: 'exact' })
      .order('id', { ascending: false })
      .range(from, to)

    const genre = useFiltersStore.getState().selectedGenre
    if (genre) {
      query = query.eq(
          'genre_name', genre
      )
    }

    const format = useFiltersStore.getState().selectedFormat
    if (format) {
      query = query.eq(
          'format_name', format
      )
    }


    const searchText = useFiltersStore.getState().searchText
    if (searchText) {
      query = query.or(
        `name.ilike.%${searchText}%`
      )
    }

    const { data: albums, count, error } = await query;

    if (error) throw error;

    return {
      albums,
      count,
    }
  },

  async getAlbum(album_id: string): Promise<any> {
    const { data: album, error } = await supabase
      .from('albums')
      .select()
      .eq('id', album_id)
      .maybeSingle()

    if (error) throw error;

    return album
  },

  async uploadAlbumCoverToStorage (file: any): Promise<any> {
    const rootStoragePath = "https://yvomtbzsvhzwkgdaaegw.supabase.co/storage/v1/object/public/album_covers"
    const { data, error } = await supabase.storage
        .from('album_covers')
        .upload(`album_${uuid()}_cover`, file);

    if (error) throw error

    return `${rootStoragePath}/${data?.path}`
  },

  async updateAlbumFields (albumId: string, data: IAlbumFormFieldsValues): Promise<any> {
    const {
      date_of_issue,
      number_of_tracks,
      genre_name,
      format_name,
      name,
      cover,
      artist_name,
      description
    } = data

    const { error } = await supabase
        .from('albums')
        .update({ date_of_issue, number_of_tracks, format_name, genre_name, name, cover, artist_name, description })
        .eq('id', albumId)

    if (error) throw error
  },

  async createNewAlbum(data: IAlbumFormFieldsValues): Promise<any> {
    const {
      date_of_issue,
      number_of_tracks,
      genre_name,
      format_name,
      name,
      cover,
      artist_name,
      description,
      user_id,
    } = data

    const { error } = await supabase
        .from('albums')
        .insert({ name, cover, artist_name , format_name, genre_name, date_of_issue, number_of_tracks, description, user_id })

    if (error) throw error
  }
}