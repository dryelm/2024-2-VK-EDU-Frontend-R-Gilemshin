export function LargeTextInput({className, onInput, value, placeholder, onKeyDown}) {
    const handleInput = (e) => {
        onInput(e.target.value);
    };

    return (
        <textarea
            className={className}
            value={value}
            placeholder={placeholder}
            onChange={handleInput}
            onKeyDown={onKeyDown}
        />
    );
}
