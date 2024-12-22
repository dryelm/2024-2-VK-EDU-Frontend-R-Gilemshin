import {ApiConfig} from "../config/ApiConfig.js";
import {handleResponse, DefaultHeaders} from "../utils/ApiHelper.js";

export async function auth(formData) {
    return await fetch(`${ApiConfig.baseUrl}/api/auth/`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: DefaultHeaders
    }).then(async res => await handleResponse(res));
}

export async function register(formData) {
    return await fetch(`${ApiConfig.baseUrl}/api/register/`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: DefaultHeaders
    }).then(async res => await handleResponse(res));
}

export const AuthApi = Object.freeze({
    auth, register
})