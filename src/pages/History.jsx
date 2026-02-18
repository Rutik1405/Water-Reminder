import WeeklyChart from '../components/WeeklyChart';
import { getLast7Days, formatDayLabel, mlToLiters, mlToGlasses } from '../utils/helpers';

export default function History({ history, dailyGoalMl, glassSizeMl }) {
    const days = getLast7Days();
    const totalWeek = days.reduce((sum, d) => sum + (history[d] || 0), 0);
    const avgDaily = totalWeek / 7;
    const daysGoalMet = days.filter(d => (history[d] || 0) >= dailyGoalMl).length;
    const streak = (() => {
        let count = 0;
        for (let i = days.length - 1; i >= 0; i--) {
            if ((history[days[i]] || 0) >= dailyGoalMl) count++;
            else break;
        }
        return count;
    })();

    return (
        <div className="flex flex-col gap-5 pb-8 animate-fade-in">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">📊 Weekly History</h2>
                <p className="text-white/40 text-sm mt-1">Your hydration journey</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                <div className="glass-card p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Avg/Day</p>
                    <p className="text-lg font-bold text-blue-400 mt-1">{mlToLiters(avgDaily)}L</p>
                </div>
                <div className="glass-card p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Goals Met</p>
                    <p className="text-lg font-bold text-emerald-400 mt-1">{daysGoalMet}/7</p>
                </div>
                <div className="glass-card p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Streak</p>
                    <p className="text-lg font-bold text-amber-400 mt-1">{streak}🔥</p>
                </div>
            </div>

            {/* Chart */}
            <div className="glass-card p-5">
                <h3 className="text-sm font-semibold text-white/60 mb-4">Last 7 Days</h3>
                <WeeklyChart history={history} days={days} dailyGoalMl={dailyGoalMl} />
            </div>

            {/* Daily breakdown */}
            <div className="glass-card p-4">
                <h3 className="text-sm font-semibold text-white/60 mb-3">Daily Breakdown</h3>
                <div className="flex flex-col gap-2">
                    {[...days].reverse().map((day) => {
                        const intake = history[day] || 0;
                        const pct = dailyGoalMl > 0 ? Math.min((intake / dailyGoalMl) * 100, 100) : 0;
                        const metGoal = intake >= dailyGoalMl;

                        return (
                            <div key={day} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                                <div className="w-14 text-xs font-semibold text-white/50">
                                    {formatDayLabel(day)}
                                </div>
                                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${metGoal
                                                ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                                                : 'bg-gradient-to-r from-blue-600 to-blue-400'
                                            }`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <div className="w-16 text-right">
                                    <span className="text-xs font-semibold text-white/60">{mlToLiters(intake)}L</span>
                                </div>
                                <div className="w-5 text-center">
                                    {metGoal ? <span className="text-emerald-400 text-xs">✓</span> : <span className="text-white/20 text-xs">○</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Week total */}
            <div className="glass-card p-4 text-center">
                <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Total This Week</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-1">
                    {mlToLiters(totalWeek)}L
                </p>
                <p className="text-xs text-white/30 mt-1">{mlToGlasses(totalWeek, glassSizeMl)} glasses total</p>
            </div>
        </div>
    );
}
