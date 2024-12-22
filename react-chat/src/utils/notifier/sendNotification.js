import imgUrl from "./default-avatar.jpg"
import notificationUrl from "./notification.mp3"

const playNotificationSound = () => {
    const audio = new Audio(notificationUrl);
    audio.play().catch((err) => {
        console.error("Ошибка воспроизведения звука:", err);
    });
};

const showNotification = (message) => {
    if (Notification.permission === "granted") {
        new Notification("Новое сообщение", {
            body: `${message.sender.first_name}: ${message.text}`,
            icon: message.sender.avatar || imgUrl,
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                showNotification(message);
            }
        });
    }
};

export const sendNotification = (message) => {
    showNotification(message);
    playNotificationSound();
    if (navigator.vibrate) {
        navigator.vibrate(200);
    }
}