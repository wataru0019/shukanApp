<script lang="ts">
    import ModalResister from "./ModalResister.svelte";
    let isOpen = $state(false);
</script>

<button
    onclick={() => (isOpen = true)}
    class="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all hover:bg-blue-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 z-50"
    aria-label="Open Modal"
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.5"
        stroke="currentColor"
        class="h-8 w-8"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
        />
    </svg>
</button>

{#if isOpen}
    <div
        class="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div class="rounded-lg bg-white p-6 shadow-xl">
            <h2 class="mb-4 text-xl font-bold">Modal Content</h2>
            <p class="mb-4">
                <ModalResister />
            </p>
            <button
                onclick={() => (isOpen = false)}
                class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 cursor-pointer"
            >
                Close
            </button>
        </div>
    </div>
{/if}
