import supabase from '@/services/api/supabaseClient.ts';
import { getRange } from '@/services/zustand/albums/albums.helpers.ts';
import {INITIAL_PAGE} from "@/services/zustand/albums/albums.store.ts";

export const albumsService = {
  async getAlbums(page: number = INITIAL_PAGE, input: string = '', genre: string = '', format: string = ''): Promise<any> {
    const { from, to } = getRange(page)
    let query = supabase
      .from('albums')
      .select('*',  { count: 'exact' })
      .order('id', { ascending: true })
      .range(from, to)

    if (genre) {
      query = query.eq(
          'genre_name', genre
      )
    }

    if (format) {
      query = query.eq(
          'format_name', format
      )
    }

    if (input) {
      query = query.or(
        `name.ilike.%${input}%`
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

}