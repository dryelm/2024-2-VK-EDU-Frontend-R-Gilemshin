import { Centrifuge } from 'centrifuge';
import {ApiConfig} from "./config/ApiConfig.js";
import {CurrentUserKey, fetchWithAuth} from "./utils/ApiHelper.js";

export function ChatUpdateManager(onMessage) {
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
            onMessage(message);
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
