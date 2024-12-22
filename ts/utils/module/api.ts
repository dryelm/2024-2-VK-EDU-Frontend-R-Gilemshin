import {TranslateResponse} from "./types";
import {ErrorDetails, TranslateParams} from "./translate";

const BASE_URL = 'https://api.mymemory.translated.net';

export async function fetchTranslation(params: TranslateParams): Promise<TranslateResponse> {
    const { text, from, to, autoDetect } = params;
    const langpair = autoDetect ? `auto|${to}` : `${from}|${to}`;
    const url = `${BASE_URL}/get?q=${encodeURIComponent(text)}&langpair=${langpair}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        if (data.responseStatus !== 200) {
            throw new Error(data.responseDetails || 'Unknown API Error');
        }

        return {
            translatedText: data.responseData.translatedText,
            sourceLanguage: data.responseData.match.language || from,
        };
    } catch (error: unknown) {
        handleError(error);
    }
}

function handleError(error: unknown): never {
    const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
    throw { message: errorMessage } as ErrorDetails;
}
