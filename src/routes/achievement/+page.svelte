<script lang="ts">
    import type { PageProps } from "./$types";
    import type { AggregatedTask } from "$lib/types";
    // データ読み込み
    let { data }: PageProps = $props();

    // データの集計処理
    const aggregatedData: AggregatedTask[] = Object.values(
        (data.data ?? []).reduce(
            (acc, curr) => {
                if (!acc[curr.task_name]) {
                    acc[curr.task_name] = {
                        task_name: curr.task_name,
                        total_reps: 0,
                        dates: [],
                    };
                }
                acc[curr.task_name].total_reps += curr.reps;
                acc[curr.task_name].dates.push(curr.scheduled_date);
                return acc;
            },
            {} as Record<string, AggregatedTask>,
        ),
    );

    // 継続日数を計算する関数
    const calculateStreak = (dates: string[]) => {
        if (dates.length === 0) return 0;

        // 日付の重複を除去し、降順（新しい順）にソート
        const uniqueDates = [...new Set(dates)].sort(
            (a, b) => new Date(b).getTime() - new Date(a).getTime(),
        );

        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        // 最新の実施日が今日でも昨日でもなければ継続ストリークは0
        if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
            return 0;
        }

        let streak = 0;
        let currentDate = new Date(uniqueDates[0]); // 最新の実施日からスタート

        for (const dateStr of uniqueDates) {
            const d = new Date(dateStr);
            // 日付が連続しているかチェック（ミリ秒単位で比較するとズレる可能性があるので日付文字列で比較推奨だが、ここではDateオブジェクトで差分計算）
            // 厳密には、currentDateとdが同じ日付であることを確認し、次はcurrentDateを1日戻して...というループが良い

            // 今回は単純化して、uniqueDatesが連続しているかを見る
            // uniqueDates[0] (最新) -> streak++
            // uniqueDates[1] が uniqueDates[0] の前日なら streak++

            const expectedDate = new Date(currentDate);
            if (streak > 0) {
                // 2回目以降のループ: 期待する日付は「前回チェックした日付の前日」
                // しかし、ループの最初はstreak=0なのでここは通らない
                // ロジック再考:
                // 基準日（currentDate）と dateStr が一致すれば streak++, currentDateを1日戻す
            }
        }

        // シンプルなロジックで再実装
        streak = 1;
        let checkDate = new Date(uniqueDates[0]); // 最新実施日（今日or昨日）

        for (let i = 1; i < uniqueDates.length; i++) {
            // 次に期待する日付（前日）
            checkDate.setDate(checkDate.getDate() - 1);
            const checkDateStr = checkDate.toISOString().split("T")[0];

            if (uniqueDates[i] === checkDateStr) {
                streak++;
            } else {
                break; // 連続が途切れたら終了
            }
        }

        return streak;
    };

    // グラフの最大値を計算（スケール用）
    const maxReps = Math.max(...aggregatedData.map((d) => d.total_reps), 1);

    // 表示用にデータを加工（パーセンテージと継続日数を計算）
    const displayData = aggregatedData.map((d) => ({
        ...d,
        percentage: Math.round((d.total_reps / maxReps) * 100),
        current_streak: calculateStreak(d.dates),
    }));
</script>

<div class="min-h-screen bg-gray-50 p-8">
    <div class="container mx-auto">
        <h1 class="text-3xl font-bold mb-8 text-gray-800">Achievements</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each displayData as item}
                <div
                    class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center"
                >
                    <h2 class="text-xl font-bold text-gray-800 mb-6">
                        {item.task_name}
                    </h2>

                    <div class="mb-8">
                        <div
                            class="flex items-center justify-center gap-2 mb-2"
                        >
                            <span class="text-6xl font-black text-orange-400"
                                >{item.current_streak}</span
                            >
                        </div>
                        <div
                            class="flex items-center justify-center gap-2 text-gray-500 font-medium"
                        >
                            <span>Day Streak</span>
                            <span class="text-orange-500">🔥</span>
                        </div>
                    </div>

                    <div class="w-full mt-auto">
                        <div
                            class="flex justify-between text-sm text-gray-500 mb-2 font-medium"
                        >
                            <span>Total Reps</span>
                            <span>{item.total_reps}</span>
                        </div>
                        <div
                            class="w-full bg-gray-100 rounded-full h-3 overflow-hidden"
                        >
                            <div
                                class="bg-green-400 h-3 rounded-full transition-all duration-1000 ease-out"
                                style:width="{item.percentage}%"
                            ></div>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>
