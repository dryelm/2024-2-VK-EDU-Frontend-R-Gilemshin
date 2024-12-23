import {TranslateResponse} from "./types";
import {TranslateParams} from "./translate";

const cache = new Map<string, TranslateResponse>();

export function getCachedTranslation(key: string): TranslateResponse | undefined {
    return cache.get(key);
}

export function setCachedTranslation(key: string, value: TranslateResponse): void {
    cache.set(key, value);
}

function generateCacheKey(params: TranslateParams): string {
    return `${params.text}_${params.from}_${params.to}`;
}

export { generateCacheKey };