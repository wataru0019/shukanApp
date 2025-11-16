import type { PageServerLoad, Actions } from "./$types";
import { supabase } from "$lib/supabaseClient"
import { redirect } from "@sveltejs/kit";

const sampleData = [
    {
      "id": 1,
      "date": "2025-11-15",
      "task": "腕立て伏せ",
      "reps": 20,
      "status": "completed"
    },
    {
      "id": 2,
      "date": "2025-11-15",
      "task": "スクワット",
      "reps": 30,
      "status": "completed"
    },
    {
      "id": 3,
      "date": "2025-11-15",
      "task": "腹筋",
      "reps": 15,
      "status": "in_progress"
    },
    {
      "id": 4,
      "date": "2025-11-14",
      "task": "ランニング",
      "reps": 5000,
      "status": "completed"
    },
    {
      "id": 5,
      "date": "2025-11-14",
      "task": "プッシュアップ",
      "reps": 25,
      "status": "completed"
    },
    {
      "id": 6,
      "date": "2025-11-13",
      "task": "腕立て伏せ",
      "reps": 20,
      "status": "completed"
    },
    {
      "id": 7,
      "date": "2025-11-13",
      "task": "スクワット",
      "reps": 30,
      "status": "skipped"
    },
    {
      "id": 8,
      "date": "2025-11-12",
      "task": "腹筋",
      "reps": 15,
      "status": "completed"
    },
    {
      "id": 9,
      "date": "2025-11-12",
      "task": "ランニング",
      "reps": 5000,
      "status": "completed"
    },
    {
      "id": 10,
      "date": "2025-11-11",
      "task": "プッシュアップ",
      "reps": 25,
      "status": "completed"
    }
  ]

export const load: PageServerLoad = async () => {
    const { data, error } = await supabase.from('tasks').select('*')
    return {
        data: data
    };
};

export const actions: Actions = {
    register: async ({ request }) => {
        const formdata = await request.formData()
        const { data, error } = await supabase
            .from('tasks')
            .insert([
                {
                    task_name: formdata.get('task'),
                    scheduled_date: formdata.get('date'),
                    reps: formdata.get('reps'),
                    status: "in_progress"
                }
            ])
            .select()
        redirect(303, "/")
    }
} satisfies Actions