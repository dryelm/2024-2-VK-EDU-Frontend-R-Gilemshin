import {Page} from "../../components/Page/Page.tsx";
import styles from "./HistoryPage.module.css";
import {useQueriesStore} from "../../utils/store/queriesStore.ts";
import {ArrowRightAlt} from "@mui/icons-material";
import {LanguagesEnum} from "../../utils/languages/LanguagesEnum.ts";
import {Link} from "react-router";

function getLanguageName(code: string): string | undefined {

    return Object.keys(LanguagesEnum).find(key => LanguagesEnum[key as keyof typeof LanguagesEnum] === code);
}

export function HistoryPage(){
    const {clearResults, results} = useQueriesStore();

    return (<Page>
        <h2 className={styles.header}>История</h2>
        <div className={styles.clearBtnContainer}>
            <Link to={"/"}>Вернутся к переводам</Link>
            <button className={styles.clearBtn} onClick={clearResults}>Очистить историю</button>
        </div>


        <ul className={styles.historyContainer}>
            {results.map((x, index) => (<li key={index} className={styles.historyItem}>
                <div className={styles.langs}>
                    <span>{getLanguageName(x.from)}</span> <ArrowRightAlt/> <span>{getLanguageName(x.to)}</span>
                </div>
                <br/>
                <div>{x.translated}</div>
                <div className={styles.toTranslate}>{x.toTranslate}</div>
            </li>))}
        </ul>
    </Page>)
}