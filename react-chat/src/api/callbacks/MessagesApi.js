import {ApiConfig} from "../config/ApiConfig.js";
import {buildQuery, fetchWithAuth, handleResponse} from "../utils/ApiHelper.js";

async function getChatMessages(chat, page, page_size, search = null) {
    if (!chat) return;
    const query = buildQuery({ chat, page, page_size, search });
    return await fetchWithAuth(`${ApiConfig.baseUrl}/api/messages/?${query}`, {
        method: 'GET'
    }).then(async res => await handleResponse(res));
}

async function getMessage(id) {
    return await fetchWithAuth(`${ApiConfig.baseUrl}/api/message/${id}/`, {
        method: 'GET'
    }).then(async res => await handleResponse(res));
}

async function sendMessage(formData) {
    return await fetchWithAuth(`${ApiConfig.baseUrl}/api/messages/`, {
        method: 'POST',
        body: JSON.stringify(formData)
    }).then(async res => await handleResponse(res));
}

export const MessagesApi = Object.freeze({
    getChatMessages, getMessage, sendMessage
})
