import { useEffect, useRef, useCallback } from 'react';

export function useReminder(enabled, intervalMinutes, onRemind) {
    const intervalRef = useRef(null);
    const onRemindRef = useRef(onRemind);

    useEffect(() => {
        onRemindRef.current = onRemind;
    }, [onRemind]);

    const requestPermission = useCallback(async () => {
        if ('Notification' in window && Notification.permission === 'default') {
            await Notification.requestPermission();
        }
    }, []);

    const sendBrowserNotification = useCallback(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('💧 AquaAlert Reminder', {
                body: 'Time to drink some water! Stay hydrated 💦',
                icon: '/vite.svg',
                badge: '/vite.svg',
                tag: 'aquaalert-reminder',
            });
        }
    }, []);

    useEffect(() => {
        if (enabled) {
            requestPermission();
        }
    }, [enabled, requestPermission]);

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (enabled && intervalMinutes > 0) {
            const ms = intervalMinutes * 60 * 1000;
            intervalRef.current = setInterval(() => {
                sendBrowserNotification();
                onRemindRef.current?.();
            }, ms);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [enabled, intervalMinutes, sendBrowserNotification]);

    return { requestPermission };
}
