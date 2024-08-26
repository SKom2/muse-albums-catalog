import useAlbumsStore from "@/services/zustand/albums/albums.store.ts";

export const getRange = (page: number) => {
    const album_per_page = useAlbumsStore.getState().album_per_page

    const from = page * album_per_page;
    const to = from + album_per_page - 1;

    return { from, to };
}
