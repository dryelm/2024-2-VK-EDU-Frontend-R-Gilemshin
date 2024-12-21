import {toast} from "react-toastify";
import {ApiConfig} from "../config/ApiConfig.js";


export const AccessTokenKey = "access";
export const RefreshTokenKey = "refresh";
export const CurrentUserKey = "currentUser";

export async function refreshToken() {
    const refresh = localStorage.getItem(RefreshTokenKey);
    if (!refresh) {
        toast.error("No refresh token available");
    }

    return await fetch(`${ApiConfig.baseUrl}/api/auth/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh })
    }).then(async res => await handleResponse(res))
        .then(data => {
            storeTokens(data);
            return data.access;
        });
}

export function storeTokens(data) {
    localStorage.setItem(AccessTokenKey, data.access);
    localStorage.setItem(RefreshTokenKey, data.refresh);
}

export function storeUser(currentUser) {
    localStorage.setItem(CurrentUserKey, JSON.stringify(currentUser));
}

export async function fetchWithAuth(url, options = {}, retryCount = 1) {
    let access = localStorage.getItem(AccessTokenKey);
    if (!access) {
        toast.error("No access token available");
    }

    options.headers = {
        ...options.headers,
        "Authorization": `Bearer ${access}`
    };

    return await fetch(url, options).then(async res => {
        if (res.status === 401 && retryCount > 0) {
            access = await refreshToken();
            options.headers["Authorization"] = `Bearer ${access}`;
            return await fetchWithAuth(url, options, retryCount - 1);
        } else if (res.status === 401 && retryCount <= 0) {
            toast.error('Maximum retry attempts exceeded');
        } else if (!res.ok) {
            throw await res.json();
        }
        return res;
    });
}

export async function handleResponse(res) {
    if (!res.ok) {
        const err = await res.json()
        handleError(res, err);
    }
    return res.json();
}

export function handleError(res, err) {
    if (Math.floor(res.status / 100) === 5) {
        toast.error("Server error occurred. Please try again later.");
    } else if (err["__all__"] || err.detail || err["non_field_errors"]) {
        toast.error((err["__all__"] || err.detail || err["non_field_errors"]));
    } else {
        toast.error(`${res.status} ${res.statusText}`);
    }
    throw err;
}

export function buildQuery(params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value) query.append(key, value);
    });
    return query.toString();
}

export const DefaultHeaders = Object.freeze({
    'Content-Type': 'application/json',
})