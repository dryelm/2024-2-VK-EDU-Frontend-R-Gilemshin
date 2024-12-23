import classNames from "classnames";
import styles from "./Button.module.css"
import {ReactNode} from "react";

export function Button(props: {className?:string, children?: ReactNode, onClick?: () => void}){
    return (
        <button onClick={props.onClick} className={classNames( styles.button, props.className  )}>
            {props.children}
        </button>
    )
}