import { useEffect, useState } from 'react';

export default function ReminderToast({ show, onClose }) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (show) {
            setIsExiting(false);
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(onClose, 300);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 z-[100]">
            <div
                className={`
          glass-card-strong p-4 flex items-center gap-3 shadow-2xl shadow-blue-500/20
          ${isExiting ? 'animate-toast-out' : 'animate-toast-in'}
        `}
            >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center animate-float">
                    <span className="text-2xl">💧</span>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">Hydration Reminder!</p>
                    <p className="text-xs text-white/60 mt-0.5">Time to drink a glass of water 💦</p>
                </div>
                <button
                    onClick={() => { setIsExiting(true); setTimeout(onClose, 300); }}
                    className="flex-shrink-0 text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
