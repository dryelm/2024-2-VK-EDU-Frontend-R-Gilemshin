import {ApiConfig} from "../config/ApiConfig.js";
import {buildQuery, fetchWithAuth, handleResponse} from "../utils/ApiHelper.js";


async function getUsers(page, page_size, search) {
    const query = buildQuery({ page, page_size, search });
    return await fetchWithAuth(`${ApiConfig.baseUrl}/api/users/?${query}`, {
        method: 'GET'
    }).then(async res => await handleResponse(res));
}

async function getUser(id) {
    return await fetchWithAuth(`${ApiConfig.baseUrl}/api/user/${id}/`, {
        method: 'GET'
    }).then(async res => await handleResponse(res));
}

async function editProfile(id, formData) {
    return await fetchWithAuth(`${ApiConfig.baseUrl}/api/user/${id}/`, {
        method: 'PATCH',
        body: formData
    }).then(async res => await handleResponse(res));
}

export const UserApi = Object.freeze({
    getUsers, getUser, editProfile
});