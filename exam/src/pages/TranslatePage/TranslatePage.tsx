import {Page} from "../../components/Page/Page.tsx";
import styles from "./TranslatePage.module.css";
import {useCallback, useState} from "react";
import {LanguagesEnum} from "../../utils/languages/LanguagesEnum.ts";
import classNames from "classnames";
import {LargeTextInput} from "../../components/LargeTextInput/LargeTextInput.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {History, SwapHoriz} from "@mui/icons-material";
import {Link} from "react-router";
import {translate, TranslateParams} from "../../../../ts/utils/module/translate.ts";
import {useQueriesStore} from "../../utils/store/queriesStore.ts";

export function TranslatePage() {

    const [languageFrom, setLanguageFrom] = useState<LanguagesEnum>(LanguagesEnum.Autodetect);
    const [languageTo, setLanguageTo] = useState(LanguagesEnum.Russian);
    const [textToTranslate, setTextToTranslate] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const {addResult} = useQueriesStore();


    const submit = useCallback(async () => {
        const params: TranslateParams = {
            from: languageFrom,
            to: languageTo,
            autoDetect: languageFrom === LanguagesEnum.Autodetect,
            text: textToTranslate
        }
        const result = await translate(params);

        setTranslatedText(result.translatedText);

        addResult({
            from: result.sourceLanguage,
            to: params.to,
            toTranslate: params.text,
            translated: result.translatedText,
            autodetect: Boolean(params.autoDetect)
        })

    }, [addResult, languageFrom, languageTo, textToTranslate]);


    function swapLangs() {
        const to = languageTo;
        if (to === LanguagesEnum.Autodetect)
            return;
        setLanguageTo(languageFrom)
        setLanguageFrom(to);
    }

    return (<Page>
        <div className={styles.mainControls}>
            <div>
                <Button
                    className={classNames(styles.languageOption, languageFrom === LanguagesEnum.Autodetect && styles.languageOption__active)}
                    onClick={() => setLanguageFrom(LanguagesEnum.Autodetect)}>
                    {"Detect Language"}
                </Button>
                <Button
                    className={classNames(styles.languageOption, languageFrom === LanguagesEnum.Russian && styles.languageOption__active)}
                    onClick={() => setLanguageFrom(LanguagesEnum.Russian)}>
                    {"Russian"}
                </Button>
                <Button
                    className={classNames(styles.languageOption, languageFrom === LanguagesEnum.English && styles.languageOption__active)}
                    onClick={() => setLanguageFrom(LanguagesEnum.English)}>
                    {"English"}
                </Button>
                <Button
                    className={classNames(styles.languageOption, languageFrom === LanguagesEnum.German && styles.languageOption__active)}
                    onClick={() => setLanguageFrom(LanguagesEnum.German)}>
                    {"German"}
                </Button>
            </div>

            <div>
                <Button
                    className={classNames(styles.languageOption, languageTo === LanguagesEnum.Russian && styles.languageOption__active)}
                    onClick={() => setLanguageTo(LanguagesEnum.Russian)}>
                    {"Russian"}
                </Button>
                <Button
                    className={classNames(styles.languageOption, languageTo === LanguagesEnum.English && styles.languageOption__active)}
                    onClick={() => setLanguageTo(LanguagesEnum.English)}>
                    {"English"}
                </Button>
                <Button
                    className={classNames(styles.languageOption, languageTo === LanguagesEnum.German && styles.languageOption__active)}
                    onClick={() => setLanguageTo(LanguagesEnum.German)}>
                    {"German"}
                </Button>

            </div>

            <LargeTextInput onInput={setTextToTranslate} value={textToTranslate}/>
            <LargeTextInput onInput={() => {
            }} value={translatedText} placeholder={"Translation"}/>

            <Button className={styles.switchLangs} onClick={swapLangs}>
                <SwapHoriz/>
            </Button>
        </div>

        <Button className={styles.submitButton} onClick={submit}>
            Translate
        </Button>

        <div className={styles.history}>
            <Link to={"/history"} className={styles.historyBtn}>
                <History></History>
            </Link>


        </div>


    </Page>)
}