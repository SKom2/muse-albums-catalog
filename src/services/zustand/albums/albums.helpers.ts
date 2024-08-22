export const getRange = (page: number, album_per_page: number) => {
    const from = page * album_per_page;
    const to = from + album_per_page - 1;

    return { from, to };
}
