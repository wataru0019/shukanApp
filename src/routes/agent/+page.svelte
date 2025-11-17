<script lang="ts">
    let query: string = $state("")
    let ai_message: string = $state("")

    const handleSubmit = async (e: Event) => {
        e.preventDefault()
        const res = await fetch("http://localhost:3000/api/agent", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ query: query })
        })
        const data = await res.json()
        const data_obj = JSON.parse(data)
        ai_message = data_obj
    }

</script>

<div>
    <form onsubmit={handleSubmit}>
        <input type="text" bind:value={query} />
        <button type="submit">送信</button>
    </form>
    <p>短期目標：{ai_message?.short_term_goal}</p>
    <p>中期目標：{ai_message?.mid_term_goal}</p>
    <p>長期目標：{ai_message?.long_term_goal}</p>
</div>