import React from 'react';

function Figure({ title, className, children }) {
    return (
        <figure className={className}>
            {title && (
                <figcaption className="text-lg font-bold underline">
                    {title}
                </figcaption>
            )}
            {children}
        </figure>
    );
}

export default Figure;
