<script lang="ts">
    import type { PageProps } from "./$types";
    import { onMount } from "svelte";

    import FlotingButton from "$lib/components/FlotingButton.svelte";
    import { invalidateAll } from "$app/navigation";

    // データ読み込み
    let { data }: PageProps = $props();

    // データ方定義
    interface Task {
        id: number;
        scheduled_date: string;
        task_name: string;
        reps: number;
        status: string;
    }

    // Stateの宣言
    let registerMode = $state(false);
    let _tasks: Task[] = $state([]);
    let _activeFilter = $state("all");

    onMount(() => {
        _tasks = Array.isArray(data.data)
            ? [...data.data].sort(
                  (a, b) =>
                      new Date(b.scheduled_date).getTime() -
                      new Date(a.scheduled_date).getTime(),
              )
            : [];
    });

    const handleRegisterButton = async () => {
        registerMode = !registerMode;
    };

    const handleFilterAll = async () => {
        _tasks = Array.isArray(data.data)
            ? [...data.data].sort(
                  (a, b) =>
                      new Date(b.scheduled_date).getTime() -
                      new Date(a.scheduled_date).getTime(),
              )
            : [];
        _activeFilter = "all";
    };

    const handleFilter = async () => {
        const filteredTasks = _tasks.filter((task) => {
            let f;
            if (task.status !== "completed") {
                f = task;
            }
            return f;
        });
        _tasks = filteredTasks;
        _activeFilter = "pending";
    };

    const handleFilterDate = async () => {
        const filteredTasks = _tasks.filter((task) => {
            let f;
            const today = new Date().toISOString().split("T")[0];
            if (task.scheduled_date === today) {
                f = task;
            }
            return f;
        });
        _tasks = filteredTasks;
        _activeFilter = "today";
    };

    const handleStatusChange = async (value: string, id: number) => {
        const modTask = _tasks.filter((task) => task.id === id);
        modTask[0].status = value;

        // supabase更新
        const response = await fetch("/api/tasks", {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ task: modTask[0] }),
        });

        await invalidateAll();
    };

    const handleDelete = async (id: number) => {
        const response = await fetch("/api/tasks", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ task: { id } }),
        });

        await invalidateAll();
    };
</script>

<div class="container mx-auto h-screen bg-gray-100">
    <div class="filter-area flex pt-20 pb-2 px-2">
        <button
            class="p-1 m-1 rounded-sm cursor-pointer"
            onclick={handleFilterAll}
            class:bg-gray-400={_activeFilter === "all"}
            class:bg-gray-200={_activeFilter !== "all"}
            >全て
        </button>
        <button
            class="p-1 m-1 bg-gray-200 rounded-sm cursor-pointer"
            onclick={handleFilter}
            class:bg-gray-400={_activeFilter === "pending"}
            class:bg-gray-200={_activeFilter !== "pending"}
            >完了済みを除く
        </button>
        <button
            class="p-1 m-1 bg-gray-200 rounded-sm cursor-pointer"
            onclick={handleFilterDate}
            class:bg-gray-400={_activeFilter === "today"}
            class:bg-gray-200={_activeFilter !== "today"}
            >本日予定
        </button>
    </div>
    <ul class="tasks-list p-2 m-4 max-h-96 overflow-y-auto bg-white rounded-sm">
        {#each _tasks as task}
            <li class="task p-2 m-2 flex justify-between items-center">
                <div class="task-info">
                    <p class="task-title">
                        タスク名　　：<span class="font-bold"
                            >{task.task_name}</span
                        >
                    </p>
                    <p class="task-date">
                        実施日　　　：<span class="font-bold"
                            >{task.scheduled_date}</span
                        >
                    </p>
                    <p class="task-times">
                        実施回数　　：<span class="font-bold">{task.reps}</span>
                    </p>
                    <p class="task-status">
                        ステータス　：
                        <select
                            value={task.status}
                            onchange={(e) =>
                                handleStatusChange(
                                    (e.target as HTMLSelectElement).value,
                                    task.id,
                                )}
                        >
                            <option value="skipped">未着手</option>
                            <option value="in_progress">実施中</option>
                            <option value="completed">完了済</option>
                        </select>
                    </p>
                </div>
                <button
                    onclick={() => handleDelete(task.id)}
                    class="delete-button p-2 text-sm cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-sm h-fit"
                    >削除
                </button>
            </li>
        {/each}
    </ul>
    <FlotingButton />
</div>
