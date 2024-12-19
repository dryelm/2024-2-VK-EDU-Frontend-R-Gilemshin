import classNames from "classnames";
import styles from "./styles.module.css"

export function Button({className, children, onClick}){
    return (
    <button onClick={() => {if (onClick) onClick()}} className={classNames( className, styles.button )}>
        {children}
    </button>
    )
}