import { forwardRef } from 'react';

function DatePickerInput({ value, onClick, className }, ref) {
    return (
        <span
            ref={ref}
            onClick={onClick}
            className="px-7 py-2 rounded border-2 align-middle cursor-pointer"
        >
            {value}
        </span>
    );
}

export default forwardRef(DatePickerInput);
