import { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useReminder } from './hooks/useReminder';
import { getTodayKey, DEFAULT_SETTINGS } from './utils/helpers';
import Navigation from './components/Navigation';
import ReminderToast from './components/ReminderToast';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showReminder, setShowReminder] = useState(false);

    // Persisted state
    const [settings, setSettings] = useLocalStorage('aquaalert-settings', DEFAULT_SETTINGS);
    const [history, setHistory] = useLocalStorage('aquaalert-history', {});

    const todayKey = getTodayKey();
    const todayIntake = history[todayKey] || 0;

    // Water intake handlers
    const addWater = useCallback((amount) => {
        const ml = amount || settings.glassSizeMl;
        setHistory((prev) => ({
            ...prev,
            [todayKey]: (prev[todayKey] || 0) + ml,
        }));
    }, [todayKey, settings.glassSizeMl, setHistory]);

    const removeWater = useCallback(() => {
        setHistory((prev) => ({
            ...prev,
            [todayKey]: Math.max(0, (prev[todayKey] || 0) - settings.glassSizeMl),
        }));
    }, [todayKey, settings.glassSizeMl, setHistory]);

    const resetToday = useCallback(() => {
        setHistory((prev) => ({
            ...prev,
            [todayKey]: 0,
        }));
    }, [todayKey, setHistory]);

    // Reminder callback
    const handleRemind = useCallback(() => {
        setShowReminder(true);
    }, []);

    // Reminder hook
    useReminder(settings.reminderEnabled, settings.reminderInterval, handleRemind);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Reminder Toast */}
            <ReminderToast show={showReminder} onClose={() => setShowReminder(false)} />

            {/* Main Content */}
            <main className="flex-1 max-w-lg mx-auto w-full px-4 pt-6 pb-24">
                {activeTab === 'dashboard' && (
                    <Dashboard
                        todayIntake={todayIntake}
                        dailyGoalMl={settings.dailyGoalMl}
                        glassSizeMl={settings.glassSizeMl}
                        onAddGlass={addWater}
                        onRemoveGlass={removeWater}
                    />
                )}
                {activeTab === 'history' && (
                    <History
                        history={history}
                        dailyGoalMl={settings.dailyGoalMl}
                        glassSizeMl={settings.glassSizeMl}
                    />
                )}
                {activeTab === 'settings' && (
                    <Settings
                        settings={settings}
                        onUpdateSettings={setSettings}
                        onResetToday={resetToday}
                    />
                )}
            </main>

            {/* Bottom Navigation */}
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
}
