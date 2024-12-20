

export function TextInput({className, onInput, value, placeholder}){
    const handleInput = (e) => {
        onInput(e.target.value);
    };
    return (
        <input
            className={className}
            value={value}
            placeholder={placeholder}
            onInput={handleInput}
        />
    )
}