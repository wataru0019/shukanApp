import type { PageServerLoad, Actions } from "./$types";

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
    return {
        data: sampleData
    };
};

export const actions: Actions = {
    register: async ({ request }) => {
        const data = await request.formData()
        console.log(data)
        return
    }
} satisfies Actions