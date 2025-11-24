<script lang="ts">
    let query: string = $state("");
    let ai_message: AiMessage = $state({
        messages: [],
        goals: {
            short_term_goal: "",
            mid_term_goal: "",
            long_term_goal: "",
        },
        tasks: [],
    });
    let is_reading: boolean = $state(false);

    interface AiMessage {
        messages: {
            role: string;
            content: string;
        }[];
        goals: {
            short_term_goal: string;
            mid_term_goal: string;
            long_term_goal: string;
        };
        tasks: {
            goal: string;
            name: string;
            description: string;
            priority: string;
            due_date: string;
        }[];
    }

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        is_reading = true;
        const res = await fetch("http://localhost:3000/api/agent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ query: query }),
        });
        const data = await res.json();
        console.log(data);
        ai_message = data;
        is_reading = false;
    };
</script>

<div>
    <form onsubmit={handleSubmit}>
        <input type="text" bind:value={query} />
        <button type="submit">送信</button>
    </form>
    <p>{is_reading ? "読み込み中..." : ""}</p>
    <div class="goals">
        <p>短期目標：{ai_message?.goals?.short_term_goal}</p>
        <p>中期目標：{ai_message?.goals?.mid_term_goal}</p>
        <p>長期目標：{ai_message?.goals?.long_term_goal}</p>
    </div>
    <div class="tasks">
        {#each ai_message?.tasks as task}
            <div class="task">
                <p>タスク名：{task.name}</p>
                <p>タスク説明：{task.description}</p>
                <p>優先度：{task.priority}</p>
                <p>期限：{task.due_date}</p>
            </div>
        {/each}
    </div>
</div>
