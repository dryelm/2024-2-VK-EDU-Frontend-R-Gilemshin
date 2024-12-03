export function TextInput({className, onInput, value, placeholder, onKeyDown}) {
    const handleInput = (e) => {
        onInput(e.target.value);
    };

    return (
        <textarea
            className={className}
            value={value}
            placeholder={placeholder}
            onChange={handleInput}
            rows={1}
            onKeyDown={onKeyDown}
        />
    );
}
