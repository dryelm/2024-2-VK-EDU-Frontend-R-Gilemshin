import {ReactNode} from "react";
import {AppHeader} from "../AppHeader/AppHeader.tsx";
import styles from "./Page.module.css"

export function Page(props: {children?: ReactNode}){
    return (
        <>
            <AppHeader/>
            <div className={styles.page}>
                {props.children}
            </div>

        </>
    )
}