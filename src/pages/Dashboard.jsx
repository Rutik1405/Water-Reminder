import { useState } from 'react';
import CircularProgress from '../components/CircularProgress';
import { getMotivationalMessage, mlToLiters, mlToGlasses } from '../utils/helpers';

export default function Dashboard({ todayIntake, dailyGoalMl, glassSizeMl, onAddGlass, onRemoveGlass }) {
    const [animateAdd, setAnimateAdd] = useState(false);
    const percentage = dailyGoalMl > 0 ? (todayIntake / dailyGoalMl) * 100 : 0;
    const remaining = Math.max(0, dailyGoalMl - todayIntake);
    const message = getMotivationalMessage(percentage);
    const glassesConsumed = mlToGlasses(todayIntake, glassSizeMl);

    const handleAdd = () => {
        setAnimateAdd(true);
        onAddGlass();
        setTimeout(() => setAnimateAdd(false), 600);
    };

    return (
        <div className="flex flex-col items-center gap-6 pb-8 animate-fade-in">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    💧 AquaAlert
                </h1>
                <p className="text-white/40 text-sm mt-1 font-medium">Smart Water Reminder</p>
            </div>

            {/* Circular Progress */}
            <div className="relative">
                <CircularProgress percentage={percentage} size={220} strokeWidth={14} />
                {animateAdd && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl animate-droplet">💧</span>
                    </div>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                <div className="glass-card p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Consumed</p>
                    <p className="text-xl font-bold text-blue-400 mt-1">{mlToLiters(todayIntake)}</p>
                    <p className="text-[10px] text-white/30">liters</p>
                </div>
                <div className="glass-card p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Remaining</p>
                    <p className="text-xl font-bold text-purple-400 mt-1">{mlToLiters(remaining)}</p>
                    <p className="text-[10px] text-white/30">liters</p>
                </div>
                <div className="glass-card p-3 text-center">
                    <p className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">Glasses</p>
                    <p className="text-xl font-bold text-cyan-400 mt-1">{glassesConsumed}</p>
                    <p className="text-[10px] text-white/30">× {glassSizeMl}ml</p>
                </div>
            </div>

            {/* Motivational Message */}
            <div className="glass-card w-full max-w-sm p-4 text-center">
                <span className="text-2xl mb-1 block">{message.emoji}</span>
                <p className="text-sm text-white/70 font-medium leading-relaxed">{message.text}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full max-w-sm">
                <button
                    id="remove-glass-btn"
                    onClick={onRemoveGlass}
                    disabled={todayIntake <= 0}
                    className="
            flex-1 glass-card py-3.5 px-4 text-center font-semibold text-sm
            text-white/60 hover:text-white hover:bg-white/10
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-300 active:scale-95 cursor-pointer
          "
                >
                    <span className="text-lg mr-1">−</span> Remove
                </button>
                <button
                    id="add-glass-btn"
                    onClick={handleAdd}
                    className="
            flex-[2] py-3.5 px-6 rounded-xl font-bold text-base text-white
            bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500
            hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400
            shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50
            transition-all duration-300 active:scale-95 cursor-pointer
            relative overflow-hidden
          "
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <span className="text-xl">+</span>
                        <span>Add Glass</span>
                        <span className="text-lg">💧</span>
                    </span>
                    <div className="absolute inset-0 animate-shimmer" />
                </button>
            </div>

            {/* Quick add */}
            <div className="flex gap-2 w-full max-w-sm">
                {[100, 250, 500, 750].map((ml) => (
                    <button
                        key={ml}
                        onClick={() => onAddGlass(ml)}
                        className="
              flex-1 glass-card py-2 text-center text-xs font-semibold
              text-white/50 hover:text-white/80 hover:bg-white/10
              transition-all duration-200 active:scale-95 cursor-pointer
            "
                    >
                        {ml}ml
                    </button>
                ))}
            </div>

            {/* Progress Bar (linear) */}
            <div className="w-full max-w-sm">
                <div className="flex justify-between text-xs text-white/40 mb-1.5 font-medium">
                    <span>Progress</span>
                    <span>{Math.min(Math.round(percentage), 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 transition-all duration-700 ease-out relative"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    >
                        <div className="absolute inset-0 animate-shimmer" />
                    </div>
                </div>
            </div>
        </div>
    );
}
