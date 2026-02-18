import { REMINDER_INTERVALS, mlToLiters } from '../utils/helpers';

export default function Settings({ settings, onUpdateSettings, onResetToday }) {
    const { dailyGoalMl, glassSizeMl, reminderEnabled, reminderInterval, unit } = settings;

    const update = (key, value) => {
        onUpdateSettings({ ...settings, [key]: value });
    };

    return (
        <div className="flex flex-col gap-5 pb-8 animate-fade-in">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-white">⚙️ Settings</h2>
                <p className="text-white/40 text-sm mt-1">Customize your hydration goals</p>
            </div>

            {/* Daily Goal */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl">🎯</span>
                    <h3 className="text-base font-semibold text-white">Daily Water Goal</h3>
                </div>

                <div className="flex items-center gap-3 mb-3">
                    <input
                        id="goal-input"
                        type="range"
                        min={500}
                        max={5000}
                        step={250}
                        value={dailyGoalMl}
                        onChange={(e) => update('dailyGoalMl', Number(e.target.value))}
                        className="flex-1 accent-blue-500 cursor-pointer"
                    />
                    <span className="w-20 text-right text-lg font-bold text-blue-400">
                        {mlToLiters(dailyGoalMl)}L
                    </span>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {[1500, 2000, 2500, 3000, 3500, 4000].map((ml) => (
                        <button
                            key={ml}
                            onClick={() => update('dailyGoalMl', ml)}
                            className={`
                px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer
                ${dailyGoalMl === ml
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                                }
              `}
                        >
                            {mlToLiters(ml)}L
                        </button>
                    ))}
                </div>
            </div>

            {/* Glass Size */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl">🥛</span>
                    <h3 className="text-base font-semibold text-white">Glass Size</h3>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {[100, 150, 200, 250, 300, 350, 500].map((ml) => (
                        <button
                            key={ml}
                            onClick={() => update('glassSizeMl', ml)}
                            className={`
                px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer
                ${glassSizeMl === ml
                                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                                }
              `}
                        >
                            {ml}ml
                        </button>
                    ))}
                </div>

                <p className="text-xs text-white/30 mt-3">
                    Each "+ Add Glass" adds {glassSizeMl}ml to your intake
                </p>
            </div>

            {/* Reminders */}
            <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🔔</span>
                        <h3 className="text-base font-semibold text-white">Reminders</h3>
                    </div>

                    <button
                        id="reminder-toggle"
                        onClick={() => update('reminderEnabled', !reminderEnabled)}
                        className={`
              relative w-12 h-7 rounded-full transition-all duration-300 cursor-pointer
              ${reminderEnabled
                                ? 'bg-blue-500 shadow-lg shadow-blue-500/30'
                                : 'bg-white/10'
                            }
            `}
                    >
                        <div
                            className={`
                absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-all duration-300
                ${reminderEnabled ? 'left-[calc(100%-1.625rem)]' : 'left-0.5'}
              `}
                        />
                    </button>
                </div>

                {reminderEnabled && (
                    <div className="animate-fade-in">
                        <p className="text-xs text-white/40 mb-3">Remind me every:</p>
                        <div className="grid grid-cols-3 gap-2">
                            {REMINDER_INTERVALS.map(({ value, label }) => (
                                <button
                                    key={value}
                                    onClick={() => update('reminderInterval', value)}
                                    className={`
                    py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer
                    ${reminderInterval === value
                                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-white/5 text-white/50 hover:bg-white/10'
                                        }
                  `}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-white/30 mt-3">
                            💡 You'll receive browser notifications and in-app alerts
                        </p>
                    </div>
                )}
            </div>

            {/* Reset */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">🔄</span>
                    <h3 className="text-base font-semibold text-white">Reset Today</h3>
                </div>
                <p className="text-xs text-white/40 mb-3">Clear today's water intake data</p>
                <button
                    id="reset-btn"
                    onClick={onResetToday}
                    className="
            w-full py-3 rounded-xl text-sm font-semibold
            bg-red-500/10 text-red-400 border border-red-500/20
            hover:bg-red-500/20 hover:border-red-500/30
            transition-all duration-200 active:scale-[0.98] cursor-pointer
          "
                >
                    Reset Today's Data
                </button>
            </div>

            {/* App Info */}
            <div className="text-center py-4">
                <p className="text-xs text-white/20">💧 AquaAlert v1.0</p>
                <p className="text-[10px] text-white/10 mt-1">Stay hydrated, stay healthy</p>
            </div>
        </div>
    );
}
