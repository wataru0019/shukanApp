const sample_data = [
    {
        "id": 1,
        "date": "2025-11-15",
        "task_name": "腕立て伏せ",
        "reps": 20,
        "status": "completed"
      },
      {
        "id": 2,
        "date": "2025-11-15",
        "task_name": "スクワット",
        "reps": 30,
        "status": "completed"
      },
      {
        "id": 3,
        "date": "2025-11-15",
        "task_name": "腹筋",
        "reps": 15,
        "status": "in_progress"
      },
]

import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const requestData = await request.json()
    console.log(requestData)
    return json({
        tasks: sample_data
    })
}