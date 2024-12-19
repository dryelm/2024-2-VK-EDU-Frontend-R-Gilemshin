import {ApiConfig} from "../config/ApiConfig.js";
import {buildQuery, fetchWithAuth, handleResponse} from "../utils/ApiHelper.js";

async function getChats(page, page_size, search = null) {
    const query = buildQuery({ page, page_size, search });
    return await fetchWithAuth(`${ApiConfig.baseUrl}/api/chats/?${query}`, {
        method: 'GET'
    }).then(async res => await handleResponse(res));
}

async function getChat(id) {
    return await fetchWithAuth(`${ApiConfig.baseUrl}/api/chat/${id}/`, {
        method: 'GET'
    }).then(async res => await handleResponse(res));
}

async function createChat(formData) {
    return await fetchWithAuth(`${ApiConfig.baseUrl}/api/chats/`, {
        method: 'POST',
        body: JSON.stringify(formData)
    }).then(async res => await handleResponse(res));
}

export const ChatsApi = Object.freeze({
    getChats, getChat, createChat
})