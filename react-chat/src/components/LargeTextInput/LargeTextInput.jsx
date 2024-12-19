import styles from "./styles.module.css";
import classNames from "classnames";
export function LargeTextInput({className, onInput, value, placeholder, onKeyDown, required}) {
    const handleInput = (e) => {
        onInput(e.currentTarget.value);
    };

    return (
        <textarea
            required={required}
            className={classNames(styles.input, className ?? "")}
            value={value}
            placeholder={placeholder}
            onChange={event => handleInput(event)}
            onKeyDown={onKeyDown}
        />
    );
}
