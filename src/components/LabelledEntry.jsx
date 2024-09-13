import React from 'react';

function LabelledEntry({ testId, label, value, className }) {
    return (
        <span data-testid={testId} className={`mx-5 text-center ${className}`}>
            <strong className="block text-xs">{label}</strong>
            {value}
        </span>
    );
}

export default LabelledEntry;
