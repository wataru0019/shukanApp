<script lang="ts">
    import { fly, fade } from "svelte/transition";
    import { page } from "$app/stores";

    let { isOpen = false, onClose } = $props();

    const menuItems = [
        { href: "/", label: "ホーム" },
        { href: "/achievement", label: "達成度" },
        { href: "/schedule", label: "スケジュール" },
    ];
</script>

{#if isOpen}
    <!-- 背景オーバーレイ -->
    <div
        class="fixed inset-0 bg-black/50 z-40 transition-opacity"
        transition:fade={{ duration: 200 }}
        onclick={onClose}
        role="button"
        tabindex="0"
        onkeydown={(e) => e.key === "Enter" && onClose()}
        aria-label="Close sidebar"
    ></div>

    <!-- サイドバー本体 -->
    <div
        class="fixed top-0 left-0 h-full bg-white z-50 shadow-xl w-full md:w-64 flex flex-col"
        transition:fly={{ x: -300, duration: 300 }}
    >
        <div
            class="flex justify-between items-center p-4 border-b border-gray-100"
        >
            <h2 class="text-xl font-bold text-gray-800">Menu</h2>
            <button
                onclick={onClose}
                class="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close menu"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>

        <nav class="flex-1 overflow-y-auto py-4">
            <ul class="space-y-1 px-2">
                {#each menuItems as item}
                    <li>
                        <a
                            href={item.href}
                            class="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                            class:bg-blue-50={$page.url.pathname === item.href}
                            class:text-blue-600={$page.url.pathname ===
                                item.href}
                            onclick={onClose}
                        >
                            {item.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>

        <div class="p-4 border-t border-gray-100">
            <button
                class="w-full px-4 py-2 text-left text-gray-600 hover:text-red-500 transition-colors flex items-center gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
                ログアウト
            </button>
        </div>
    </div>
{/if}
