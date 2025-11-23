<script lang="ts">
    let _task = $state("");
    let _date = $state("");
    let _reps = $state(0);
</script>

<form method="POST" action="?/register" class="p-2 m-2 bg-white rounded-sm">
    <div class="form-control p-2 flex items-center gap-4">
        <label for="task" class="w-32">タスクの名前：</label>
        <input
            name="task"
            placeholder="..."
            bind:value={_task}
            class="border border-gray-500 p-2 rounded-sm flex-1"
        />
    </div>
    <div class="form-control p-2 flex items-center gap-4">
        <label for="date" class="w-32">実施予定日：</label>
        <input
            name="date"
            type="date"
            bind:value={_date}
            class="border border-gray-500 p-2 rounded-sm flex-1"
        />
    </div>
    <div class="form-control p-2 flex items-center gap-4">
        <label for="reps" class="w-32">回数：</label>
        <input
            name="reps"
            type="number"
            placeholder="..."
            bind:value={_reps}
            class="border border-gray-500 p-2 rounded-sm flex-1"
        />
    </div>
    <div class="form-control submit p-2">
        <button
            type="submit"
            class="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 cursor-pointer"
            >送信
        </button>
    </div>
</form>
