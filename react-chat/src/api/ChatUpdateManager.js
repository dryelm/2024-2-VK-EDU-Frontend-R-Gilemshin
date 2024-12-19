import { Centrifuge } from 'centrifuge';
import {ApiConfig} from "./config/ApiConfig.js";
import {ChatsApi} from "./callbacks/ChatsApi.js";
import {CurrentUserKey, fetchWithAuth} from "./utils/ApiHelper.js";

export function ChatUpdateManager(chatId, setMessages, setLatestMessage, setChats) {
    const currentUser = JSON.parse(localStorage.getItem(CurrentUserKey));

    function getConnectionToken() {
        return (ctx) =>
            new Promise((resolve, reject) =>
                fetchWithAuth(`${ApiConfig.baseUrl}/api/centrifugo/connect/`, {
                    body: JSON.stringify(ctx),
                    method: 'POST'
                })
                    .then((res) => res.json())
                    .then((data) => resolve(data.token))
                    .catch((err) => reject(err))
            );
    }

    function getSubscriptionToken() {
        return (ctx) =>
            new Promise((resolve, reject) =>
                fetchWithAuth(`${ApiConfig.baseUrl}/api/centrifugo/subscribe/`, {
                    body: JSON.stringify(ctx),
                    method: 'POST'
                })
                    .then((res) => res.json())
                    .then((data) => resolve(data.token))
                    .catch((err) => reject(err))
            );
    }

    const centrifuge = new Centrifuge(`${ApiConfig.baseUrlCentrifuge}/connection/websocket/`, {
        getToken: getConnectionToken()
    });

    const subscription = centrifuge.newSubscription(currentUser['id'], {
        getToken: getSubscriptionToken()
    });

    subscription.on('publication', async function (ctx) {
        const { event, message } = ctx.data;

        if (event === 'create') {
            if (setMessages) {
                setMessages((prevMessages) => {
                    if (prevMessages.some((msg) => msg.id === message.id || message.chat !== chatId)) {
                        return prevMessages;
                    }
                    return [message, ...prevMessages];
                });
            }

            if (setLatestMessage) {
                setLatestMessage((prevLatestMessage) => {
                    if (prevLatestMessage.id !== message.id && message.chat === chatId) {
                        return message;
                    }
                    return prevLatestMessage;
                });
            }

            if (setChats) {
                const newChat = await ChatsApi.getChat(message.chat);
                setChats((prevChats) => {
                    if (!prevChats.some((chat) => chat.id === message.chat)) {
                        if (newChat.members.some((user) => user.id === currentUser['id'])) {
                            return [newChat, ...prevChats];
                        }
                    }
                    return prevChats;
                });
            }
        }
    });

    subscription.subscribe();
    centrifuge.connect();

    return {unsubscribe: () => {
        centrifuge.disconnect();
        subscription.removeAllListeners();
        subscription.unsubscribe();
    }};
}
