import supabase from '@/services/api/supabaseClient.ts';
import { getRange } from '@/services/zustand/albums/albums.helpers.ts';

export const albumsService = {
  async getAlbums(page: number): Promise<any> {
    const { from, to } = getRange(page)
    const { data: albums, count, error } = await supabase
      .from('albums')
      .select('*',  { count: 'exact' })
      .order('id', { ascending: true })
      .range(from, to)

    if (error) throw error;

    return {
      albums,
      count,
    }
  },

  async getAlbum(album_id: string): Promise<any> {
    const { data: album, error } = await supabase
      .from('albums')
      .select('*')
      .eq('id', album_id)
      .maybeSingle()

    if (error) throw error;

    return album
  }
}