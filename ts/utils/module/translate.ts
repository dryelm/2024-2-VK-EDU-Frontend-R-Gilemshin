import { fetchTranslation } from './api';
import {generateCacheKey, getCachedTranslation, setCachedTranslation} from "./cache";
import {TranslateResponse} from "./types";

export async function translate(params: TranslateParams): Promise<TranslateResponse> {
    const cacheKey = generateCacheKey(params);
    const cached = getCachedTranslation(cacheKey);
    if (cached) return cached;

    const result = await fetchTranslation(params);
    setCachedTranslation(cacheKey, result);
    return result;
}

export interface TranslateParams {
    text: string;
    from: string;
    to: string;
    autoDetect?: boolean;
}

export interface ErrorDetails {
    message: string;
    statusCode?: number;
}