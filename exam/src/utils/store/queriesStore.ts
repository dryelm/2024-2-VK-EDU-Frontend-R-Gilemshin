import {create} from "zustand";
import {TranslateResult} from "../types/TranslateRequest.ts";

const STORAGE_KEY = 'translateResults';

const loadFromLocalStorage = (): TranslateResult[] => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
};

const saveToLocalStorage = (results: TranslateResult[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
};

export const useQueriesStore = create<{
    results: TranslateResult[];
    addResult: (result: TranslateResult) => void;
    removeResult: (index: number) => void;
    clearResults: () => void;
}>((set) => ({
    results: loadFromLocalStorage(),

    addResult: (result) =>
        set((state) => {
            const updatedResults = [...state.results, result];
            saveToLocalStorage(updatedResults);
            return { results: updatedResults };
        }),

    removeResult: (index) =>
        set((state) => {
            const updatedResults = state.results.filter((_, i) => i !== index);
            saveToLocalStorage(updatedResults);
            return { results: updatedResults };
        }),

    clearResults: () =>
        set(() => {
            saveToLocalStorage([]);
            return { results: [] };
        }),
}));
