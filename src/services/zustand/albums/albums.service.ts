import supabase from '@/services/api/supabaseClient.ts';
import { getRange } from '@/services/zustand/albums/albums.helpers.ts';
import {uuid} from "@supabase/supabase-js/dist/main/lib/helpers";
import {IAlbumFormFieldsValues} from "@/services/zustand/albums/albums.types.ts";
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import useAuthStore from "@/services/zustand/auth/auth.store.ts";
import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";

export const albumsService = {
  async fetchAlbums(index?: number): Promise<any> {
    const { from, to } = index
        ? { from: index, to: index }
        : getRange(useAlbumsStore.getState().page);

    const userId = useAuthStore.getState().user?.id;
    if (!userId) throw new Error("User not authenticated");

    let query = supabase
        .from('albums')
        .select(`
            *,
            favorites!left(
                album_id
            )
        `, { count: 'exact' })
        .eq('favorites.user_id', userId)
        .order('id', { ascending: false })
        .range(from, to);

    const genre = useFiltersStore.getState().selectedGenre;
    if (genre) {
      query = query.eq('genre_name', genre);
    }

    const format = useFiltersStore.getState().selectedFormat;
    if (format) {
      query = query.eq('format_name', format);
    }

    const searchText = useFiltersStore.getState().searchText;
    if (searchText) {
      query = query.ilike('name', `%${searchText}%`);
    }

    const { data: albums, count, error } = await query;

    if (error) throw error;

    const updatedAlbums = albums.map(album => ({
      ...album,
      isFavorite: album.favorites.length > 0,
    }));

    return {
      albums: updatedAlbums,
      count,
    };
  },

  async fetchFavoriteAlbums(index?: number) {
    const { from, to } = index
        ? { from: index, to: index }
        : getRange(useAlbumsStore.getState().favoritesPage);

    const userId = useAuthStore.getState().user?.id;
    if (!userId) throw new Error("User not authenticated");

    let query = supabase
        .from('favorites')
        .select(`album:album_id (*)`, { count: 'exact' })
        .eq('user_id', userId)
        .not('album', 'is', null)
        .order('id', { ascending: false })

    const genre = useFiltersStore.getState().selectedGenre;
    if (genre) {
      query = query.eq(
          'album.genre_name', genre
      )
    }

    const format = useFiltersStore.getState().selectedFormat;
    if (format) {
      query = query.eq(
          'album.format_name', format
      )
    }

    const searchText = useFiltersStore.getState().searchText;
    if (searchText) {
      query = query.ilike('album.name', `%${searchText}%`);
    }

    const { count} = await query;

    const { data, error } = await query.range(from, to);

    if (error) throw error;

    const albums = data
        .filter((item: any) => item.album !== null)
        .map((item: any) => ({
          ...item.album,
          isFavorite: true
        }))

    return {
      albums,
      count: count,
    };
  },

  async fetchAlbumById(album_id: string): Promise<any> {
    const { data: album, error } = await supabase
      .from('albums')
      .select()
      .eq('id', album_id)
      .maybeSingle()

    if (error) throw error;

    return album
  },

  async deleteAlbum(album_id: number): Promise<any> {
    const { error } = await supabase.from('albums').delete().match({ id: album_id})

    if (error) throw error;

    return
  },

  async deleteAlbumFromFavorites(album_id: number): Promise<any> {
    const { error } = await supabase.from('favorites').delete().match({ album_id })

    if (error) throw error;

    return;
  },

  async deleteAlbumFromUserFavorites(album_id: number): Promise<any> {
    const user_id = useAuthStore.getState().user?.id;

    const data = {
      user_id,
      album_id
    }

    const { error } = await supabase.from('favorites').delete().match(data)

    if (error) throw error;

    return;
  },

  async insertAlbumToFavorites(album_id: number): Promise<any> {
    const user_id = useAuthStore.getState().user?.id

    const data = {
      user_id,
      album_id
    }

    const { error } = await supabase.from('favorites').insert(data)

    if (error) throw error;

    return;
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
    const { error } = await supabase
        .from('albums')
        .update(data)
        .eq('id', albumId)

    if (error) throw error
  },

  async createNewAlbum(data: IAlbumFormFieldsValues): Promise<any> {
    const { data: album, error } = await supabase
        .from('albums')
        .insert(data)
        .select()


    if (error) throw error

    return album
  },
}