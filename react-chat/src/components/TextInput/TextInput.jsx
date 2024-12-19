import styles from "./styles.module.css"
import classNames from "classnames";

export function TextInput({className, onInput, value, placeholder, required, type}){
    const handleInput = (e) => {
        onInput(e.target.value);
    };
    return (
        <input
            type={type}
            className={classNames(styles.input, className)}
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
            required={required}
        />
    )
}