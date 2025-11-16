<script lang="ts">
    // データ方定義
    interface Task {
        id: number,
        scheduled_date: string,
        task_name: string,
        reps: number,
        status: string
    }

    // state定義
    let _tasks: Task[] = $state([])
    let _query: string = $state("")

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        const res = await fetch("/api/schedule_ai", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ query: _query })
        })
        const responseDate = await res.json()
        _tasks = [...responseDate?.tasks]
        console.log(responseDate)
    }

</script>

<div class="container mx-auto">
    <h1 class="p-2 text-center text-4xl">計画を立てる</h1>
    <div class="input-form">
        <form
            onsubmit={handleSubmit}
            class="p-4 m-4">
            <div class="form-control flex">
                <label
                    for="gole"
                    class="w-32"
                    >目標：</label>
                <textarea
                    name="gole"
                    placeholder="あなたの目標を記入してください"
                    rows=4
                    bind:value={_query}
                    class="p-2 flex-1 border border-gray-100 rounded-sm"
                    ></textarea>
            </div>
            <div class="form-control p-2 flex justify-center">
                <button
                    type="submit"
                    class="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 cursor-pointer"
                    >送信
                </button>
            </div>
        </form>
    </div>
    <div class="response-area">
        目標を達成するためのタスクを表示します。
        <ul>
            {#each _tasks as task}
                <li>{task.task_name}</li>
                <li>{task.reps}</li>
            {/each}
        </ul>
    </div>
</div>