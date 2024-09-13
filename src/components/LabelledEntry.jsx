import React from 'react';

function LabelledEntry({ label, value, className }) {
    return (
        <span className={`mx-5 text-center ${className}`}>
            <strong className="block text-xs">{label}</strong>
            {value}
        </span>
    );
}

export default LabelledEntry;
