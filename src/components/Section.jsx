import React from 'react';

function Section({ testId, title, className, children }) {
    return (
        <section
            data-testid={testId}
            className={`rounded-md shadow-md p-2 bg-white my-4 ${
                className ?? ''
            }`}
        >
            {title && <h3 className="text-lg font-bold underline">{title}</h3>}
            {children}
        </section>
    );
}

export default Section;
