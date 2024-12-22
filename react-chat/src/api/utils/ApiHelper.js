import {toast} from "react-toastify";
import {ApiConfig} from "../config/ApiConfig.js";
import {useAuthStore} from "../../utils/store/tokensStore.js";


export const AccessTokenKey = "access";

export async function refreshToken() {
    const { refreshToken, setTokens } = useAuthStore.getState();

    if (!refreshToken) {
        toast.error("No refresh token available");
        throw new Error("No refresh token available");
    }

    return await fetch(`${ApiConfig.baseUrl}/api/auth/refresh/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
    })
        .then(async (res) => await handleResponse(res))
        .then((data) => {
            setTokens({ access: data.access, refresh: data.refresh });
            return data.access;
        });
}

export async function fetchWithAuth(url, options = {}, retryCount = 1) {
    const { accessToken, clearTokens } = useAuthStore.getState();

    if (!accessToken) {
        toast.error("No access token available");
        throw new Error("No access token available");
    }

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    return await fetch(url, options).then(async (res) => {
        if (res.status === 401 && retryCount > 0) {
            const newAccessToken = await refreshToken();
            options.headers.Authorization = `Bearer ${newAccessToken}`;
            return await fetchWithAuth(url, options, retryCount - 1);
        } else if (res.status === 401) {
            toast.error("Authentication failed. Please log in again.");
            clearTokens();
            throw new Error("Unauthorized");
        } else if (!res.ok) {
            throw await res.json();
        }
        return res;
    });
}

export async function handleResponse(res) {
    if (!res.ok) {
        const err = await res.json();
        handleError(res, err);
    }
    return res.json();
}

export function handleError(res, err) {
    if (Math.floor(res.status / 100) === 5) {
        toast.error("Server error occurred. Please try again later.");
    } else if (err["__all__"] || err.detail || err["non_field_errors"]) {
        toast.error(err["__all__"] || err.detail || err["non_field_errors"]);
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
    "Content-Type": "application/json",
});