import {create} from "zustand";

export const useAuthStore = create((set) => ({
    accessToken: localStorage.getItem("access") || null,
    refreshToken: localStorage.getItem("refresh") || null,
    setTokens: ({ access, refresh }) => {
        if (access) {
            localStorage.setItem("access", access);
            set({ accessToken: access });
        }
        if (refresh) {
            localStorage.setItem("refresh", refresh);
            set({ refreshToken: refresh });
        }
    },
    clearTokens: () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        set({ accessToken: null, refreshToken: null });
    },
}));