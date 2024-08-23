import supabase from "@/services/api/supabaseClient.ts";

const filtersService = {
    async getGenres(): Promise<any> {
        const { data: genres, error } = await supabase
            .from('genres')
            .select('*')

        if (error) throw error

        return genres
    },

    async getFormats(): Promise<any> {
        const { data: formats, error } = await supabase
            .from('formats')
            .select('*')

        if (error) throw error

        return formats
    }
}

export default filtersService;