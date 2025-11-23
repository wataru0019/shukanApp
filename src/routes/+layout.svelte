<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import Sidebar from "$lib/components/Sidebar.svelte";

	let { children } = $props();
	let isSidebarOpen = $state(false);

	const toggleSidebar = () => {
		isSidebarOpen = !isSidebarOpen;
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header
	class="fixed top-0 left-0 right-0 bg-blue-500 flex justify-between z-30 shadow-md"
>
	<div class="menu-bar flex p-2">
		<button
			class="items-center justify-center p-2 text-white text-2xl cursor-pointer hover:bg-blue-600 rounded transition-colors"
			onclick={toggleSidebar}
			aria-label="Open menu"
			>≡
		</button>
	</div>
	<div class="flex items-center">
		<h1 class="p-2 text-center text-2xl text-white font-bold">
			習慣化アプリ
		</h1>
	</div>
	<div class="auth-bar flex p-2">
		<button
			class="items-center justify-center p-2 text-white cursor-pointer hover:bg-blue-600 rounded transition-colors"
			>ログアウト
		</button>
	</div>
</header>

<Sidebar isOpen={isSidebarOpen} onClose={() => (isSidebarOpen = false)} />

<main class="pt-16">
	{@render children()}
</main>
