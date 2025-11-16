import type { RequestHandler } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export const PATCH: RequestHandler = async ({ request }) => {
    // Example: parse JSON body from the incoming POST request
    const requestData = await request.json();
    
    // Do something with the data...
    const { data, error } = await supabase
        .from("tasks")
        .update(requestData.task)
        .eq('id', requestData.task.id)
        .select()
        
    if (error) {
        console.error('Update error:', error)
        // エラー処理（レスポンス返却など）
        return { success: false, error: error.message }
    }

    return new Response(JSON.stringify({ success: true, received: data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}