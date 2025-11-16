<script lang="ts">

</script>

<div class="container h-screen mx-auto bg-gray-100">
    <h2 class="p-2 text-center text-2xl">サインアップ</h2>
    <form
        class="p-2 m-2"
        method="POST"
        action="?/signup"
        >
        <div class="form-control p-2 flex items-center gap-4">
            <label for="name" class="w-32">名前：</label>
            <input
                type="text"
                name="name"
                class="p-2 border border-gray-200 rounded-sm"
                placeholder="..." />
        </div>
        <div class="form-control p-2 flex items-center gap-4">
            <label for="mail" class="w-32">メール：</label>
            <input
                type="mail"
                name="mail"
                class="p-2 border border-gray-200 rounded-sm"
                placeholder="example@example.com" />
        </div>
        <div class="form-control p-2 flex items-center gap-4">
            <label for="password" class="w-32">パスワード：</label>
            <input
                type="password"
                name="password"
                class="p-2 border border-gray-200 rounded-sm"
                placeholder="..." />
        </div>
        <div class="form-control p-2 flex justify-center items-center gap-4">
            <button
                type="submit"
                class="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 cursor-pointer">
                登録する
            </button>
        </div>
    </form>
</div>