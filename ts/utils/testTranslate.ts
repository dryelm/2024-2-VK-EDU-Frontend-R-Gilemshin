import TranslateUtils from "./index";

(async () => {
    const params: TranslateUtils.TranslateParams = {
        text: 'Hello, world!',
        from: 'en',
        to: 'fr',
        autoDetect: false,
    };

    try {
        const result = await TranslateUtils.translate(params);
        console.log('Translation result:', result);
    } catch (error) {
        console.error('Error during translation:', error);
    }
})();

(async () => {
    const params: TranslateUtils.TranslateParams = {
        text: 'Hello, world!',
        from: 'auto',
        to: 'fr',
        autoDetect: false,
    };

    try {
        const result = await TranslateUtils.translate(params);
        console.log('Translation result:', result);
    } catch (error) {
        console.error('Error during translation:', error);
    }
})();