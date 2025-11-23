import type { PageServerLoad } from "./$types";
import { supabase } from "$lib/supabaseClient"

export const load: PageServerLoad = async () => {
    const { data, error } = await supabase.from('tasks').select('*')
    return {
        data: data
    };
};