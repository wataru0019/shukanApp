export interface Task {
    id: number;
    scheduled_date: string;
    task_name: string;
    reps: number;
    status: string;
}

export interface AggregatedTask {
    task_name: string;
    total_reps: number;
    dates: string[];
}