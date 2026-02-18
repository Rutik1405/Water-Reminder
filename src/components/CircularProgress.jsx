import { useMemo } from 'react';

export default function CircularProgress({ percentage, size = 200, strokeWidth = 12 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;
    const center = size / 2;

    const gradientId = 'progress-gradient';

    const displayPercent = Math.min(Math.round(percentage), 100);

    const color = useMemo(() => {
        if (percentage >= 100) return '#22c55e';
        if (percentage >= 75) return '#3b82f6';
        if (percentage >= 50) return '#60a5fa';
        return '#93c5fd';
    }, [percentage]);

    return (
        <div className="relative inline-flex items-center justify-center animate-scale-in">
            <svg width={size} height={size} className="transform -rotate-90">
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background track */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={strokeWidth}
                />

                {/* Progress arc */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    filter="url(#glow)"
                    className="transition-all duration-1000 ease-out"
                    style={{ '--circumference': circumference }}
                />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {displayPercent}%
                </span>
                <span className="text-sm text-white/50 mt-1 font-medium">completed</span>
            </div>
        </div>
    );
}
