<script lang="ts">
    import type { PageProps } from "./$types";
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";

    // データ読み込み
    let { data }: PageProps = $props()

    // データ方定義
    interface Task {
        id: number,
        scheduled_date: string,
        task_name: string,
        reps: number,
        status: string
    }

    // Stateの宣言
    let registerMode = $state(false);
    let _tasks: Task[] = $state([]);
    let _task = $state("");
    let _date = $state("");
    let _reps = $state(0);
    let _activeFilter = $state("all")

    onMount(() => {
        _tasks = Array.isArray(data.data) ? [...data.data] : [];
    });

    const handleRegisterButton = async () => {
        registerMode = !registerMode;
    }

    // const handleSubmit = async (e: Event) => {
    //     e.preventDefault();
    //     const newTask = {
    //         id: (_tasks.at(-1)?.id ?? 0) + 1,
    //         date: _date,
    //         task: _task,
    //         reps: _reps,
    //         status: "in_progress"
    //     }

    //     _tasks.push(newTask)
    //     _date = ""
    //     _task = ""
    //     _reps = 0
    //     registerMode = !registerMode
    // }

    const handleFilterAll = async () => {
        _tasks = Array.isArray(data.data) ? [...data.data] : [];
        _activeFilter = "all"
    }

    const handleFilter = async () => {
        const filteredTasks = _tasks.filter((task) => {
            let f;
            if (task.status !== "completed") {
                f = task
            }
            return f
        })
        _tasks = filteredTasks
        _activeFilter = "pending"
    }

    const handleFilterDate = async () => {
        const filteredTasks = _tasks.filter((task) => {
            let f;
            const today = new Date().toISOString().split('T')[0];
            if (task.scheduled_date === today) {
                f = task
            }
            return f
        })
        _tasks = filteredTasks
        _activeFilter = "today"
    }

    const handleStatusChange = async (value: string, id: number) => {
        const modTask = _tasks.filter((task) => task.id === id)
        modTask[0].status = value

        // supabase更新
        const response = await fetch("/api/tasks", {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ task: modTask[0] })
        })
    }

</script>

<div class="container mx-auto h-screen bg-gray-100">
    <h1 class="fixed top-0 left-0 right-0 p-2 text-center text-4xl text-white font-bold bg-blue-500">習慣化アプリ</h1>
    <div class="register-area pt-20 pb-2 px-2">
    <button onclick={handleRegisterButton} class="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 cursor-pointer">
        {#if registerMode}
            閉じる
        {:else}
            登録する
        {/if}
    </button>
    {#if registerMode}
        <!-- <form method="POST" onsubmit={handleSubmit} class="p-2"> -->
        <form method="POST" action="?/register" class="p-2 m-2 bg-white rounded-sm">
            <div class="form-control p-2 flex items-center gap-4">
                <label for="task" class="w-32">タスクの名前：</label>
                <input name="task" placeholder="..." bind:value={_task} class="border border-gray-500 p-2 rounded-sm" />
            </div>
            <div class="form-control p-2 flex items-center gap-4">
                <label for="date" class="w-32">実施予定日：</label>
                <input name="date" type="date" bind:value={_date} class="border border-gray-500 p-2 rounded-sm" />
            </div>
            <div class="form-control p-2 flex items-center gap-4">
                <label for="reps" class="w-32">回数：</label>
                <input name="reps" type="number" placeholder="..." bind:value={_reps} class="border border-gray-500 p-2 rounded-sm" />
            </div>
            <div class="form-control submit p-2">
                <button type="submit" class="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 cursor-pointer">送信</button>
            </div>
        </form>
    {/if}
    </div>
    <hr />
    <div class="filter-area flex p-2">
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
        <li class="task p-2 m-2">
            <p class="task-title">タスク名　　：<span class="font-bold">{ task.task_name }</span></p>
            <p class="task-date">実施日　　　：<span class="font-bold">{ task.scheduled_date }</span></p>
            <p class="task-times">実施回数　　：<span class="font-bold">{ task.reps }</span></p>
            <p class="task-status">
                ステータス　：
                <select value={ task.status } onchange={(e) => handleStatusChange((e.target as HTMLSelectElement).value, task.id)}>
                    <option value="skipped">未着手</option>
                    <option value="in_progress">実施中</option>
                    <option value="completed">完了済</option>
                </select>
            </p>
        </li>
        {/each}
    </ul>
</div>

