export const getRange = (page: number) => {
    const ALBUM_PER_PAGE = 5;
    const from = page * ALBUM_PER_PAGE;
    const to = from + ALBUM_PER_PAGE - 1;

    return { from, to };
}