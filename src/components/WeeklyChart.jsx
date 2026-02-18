import { formatDayLabel, mlToLiters } from '../utils/helpers';

export default function WeeklyChart({ history, days, dailyGoalMl }) {
    const maxValue = Math.max(dailyGoalMl, ...days.map(d => history[d] || 0));

    return (
        <div className="w-full animate-fade-in">
            <div className="flex items-end justify-between gap-2 h-48 px-1">
                {days.map((day, i) => {
                    const intake = history[day] || 0;
                    const heightPercent = maxValue > 0 ? (intake / maxValue) * 100 : 0;
                    const goalPercent = intake >= dailyGoalMl ? 100 : (intake / dailyGoalMl) * 100;
                    const isToday = i === days.length - 1;

                    return (
                        <div key={day} className="flex flex-col items-center flex-1 h-full justify-end gap-1.5 group">
                            {/* Value label */}
                            <span className="text-[10px] font-semibold text-white/50 group-hover:text-white/80 transition-colors whitespace-nowrap">
                                {mlToLiters(intake)}L
                            </span>

                            {/* Bar container */}
                            <div className="relative w-full max-w-[36px] h-full flex items-end">
                                {/* Goal line */}
                                <div
                                    className="absolute w-full border-t border-dashed border-white/15"
                                    style={{ bottom: `${(dailyGoalMl / maxValue) * 100}%` }}
                                />

                                {/* Bar */}
                                <div
                                    className={`
                    w-full rounded-t-lg animate-bar-grow transition-all duration-500
                    ${goalPercent >= 100
                                            ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-500/20'
                                            : isToday
                                                ? 'bg-gradient-to-t from-blue-600 to-blue-400 shadow-lg shadow-blue-500/20'
                                                : 'bg-gradient-to-t from-blue-700/60 to-blue-500/60'
                                        }
                  `}
                                    style={{
                                        height: `${Math.max(heightPercent, 2)}%`,
                                        animationDelay: `${i * 100}ms`,
                                    }}
                                />
                            </div>

                            {/* Day label */}
                            <span className={`
                text-xs font-medium
                ${isToday ? 'text-blue-400' : 'text-white/40'}
              `}>
                                {formatDayLabel(day)}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Goal indicator */}
            <div className="flex items-center gap-2 mt-4 justify-center">
                <div className="w-3 h-0.5 border-t border-dashed border-white/30" />
                <span className="text-[10px] text-white/30 font-medium">Daily Goal ({mlToLiters(dailyGoalMl)}L)</span>
            </div>
        </div>
    );
}
