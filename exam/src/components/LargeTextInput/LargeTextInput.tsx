import React from "react";
import classNames from "classnames";
import styles from "./LargeTextInput.module.css"

export function LargeTextInput(props: {
    className?: string,
    onInput: (value: string) => void,
    value: string,
    placeholder?: string,
    onKeyDown?: (e:  React.KeyboardEvent<HTMLTextAreaElement>) => void, required?: boolean}) {
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.onInput(e.currentTarget.value);
    };

    return (
        <textarea
            required={props.required}
            className={classNames(styles.input, props.className)}
            value={props.value}
            placeholder={props.placeholder}
            onChange={event => handleInput(event)}
            onKeyDown={props.onKeyDown}
    />);
}