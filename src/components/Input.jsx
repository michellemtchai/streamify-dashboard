function Input({
    type,
    id,
    value,
    name,
    onChange,
    onBlur,
    onInput,
    placeholder,
    min,
    max,
    className,
}) {
    return (
        <input
            type={type}
            className={`rounded px-1 ${className ?? ''}`}
            id={id}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            onInput={onInput}
            placeholder={placeholder}
            max={max}
            min={min}
            value={value}
        />
    );
}

export default Input;
