export const MOTIVATIONAL_MESSAGES = [
    { min: 0, max: 10, text: "Let's get started! Your body is waiting for hydration 💧", emoji: "🚀" },
    { min: 10, max: 25, text: "Good start! Keep the momentum going 💪", emoji: "👍" },
    { min: 25, max: 50, text: "You're doing great! Almost halfway there 🌊", emoji: "💧" },
    { min: 50, max: 75, text: "Halfway champion! Your body thanks you 🎉", emoji: "🎯" },
    { min: 75, max: 90, text: "Almost there! You're crushing it today! 🔥", emoji: "🏆" },
    { min: 90, max: 100, text: "So close to your goal! One more push! ⭐", emoji: "✨" },
    { min: 100, max: Infinity, text: "🎊 Goal achieved! You're a hydration hero! 🦸", emoji: "🎊" },
];

export function getMotivationalMessage(percentage) {
    const msg = MOTIVATIONAL_MESSAGES.find(m => percentage >= m.min && percentage < m.max);
    return msg || MOTIVATIONAL_MESSAGES[MOTIVATIONAL_MESSAGES.length - 1];
}

export function getTodayKey() {
    return new Date().toISOString().split('T')[0];
}

export function getLast7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        days.push(d.toISOString().split('T')[0]);
    }
    return days;
}

export function formatDayLabel(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateStr === today.toISOString().split('T')[0]) return 'Today';
    if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yday';

    return d.toLocaleDateString('en', { weekday: 'short' });
}

export function mlToLiters(ml) {
    return (ml / 1000).toFixed(1);
}

export function mlToGlasses(ml, glassSize) {
    return Math.floor(ml / glassSize);
}

export const REMINDER_INTERVALS = [
    { value: 15, label: '15 min' },
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hrs' },
    { value: 120, label: '2 hours' },
];

export const DEFAULT_SETTINGS = {
    dailyGoalMl: 2500,
    glassSizeMl: 250,
    reminderEnabled: false,
    reminderInterval: 30,
    unit: 'ml',
};
