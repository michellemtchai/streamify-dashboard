import React from 'react';

function Section({ title, className, children }) {
    return (
        <section
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
