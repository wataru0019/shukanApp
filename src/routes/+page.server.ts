import type { PageServerLoad, Actions } from "./$types";
import { supabase } from "$lib/supabaseClient"
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { safeGetSession, supabase } }) => {
  const { session } = await safeGetSession()

  if (!session) {
    throw redirect(303, '/auth/login')
  }

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', session.user.id)

  return {
    data: data
  };
};

export const actions: Actions = {
  register: async ({ request, locals: { supabase, safeGetSession } }) => {
    const { session } = await safeGetSession()

    if (!session) {
      throw redirect(303, '/auth/login')
    }

    const formdata = await request.formData()
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          task_name: formdata.get('task'),
          scheduled_date: formdata.get('date'),
          reps: formdata.get('reps'),
          status: "in_progress",
          user_id: session.user.id
        }
      ])
      .select()
    throw redirect(303, "/")
  }
} satisfies Actions