import React, { useState, useEffect } from 'react';
import Section from './Section';

function Table({ headings, data, sorting, transform, className }) {
    let [sortAsc, setSortAsc] = useState(true);
    let [sortIndex, setSortIndex] = useState(0);
    let [sortedData, setSortedData] = useState(data);

    useEffect(() => {
        let res = sorting[sortIndex](data);
        setSortedData(transform(res));
    }, []);

    const setSort = (index) => {
        if (sortIndex == index) {
            setSortAsc(!sortAsc);
        } else {
            setSortIndex(index);
            setSortAsc(true);
        }
        let res = sorting[index](data);
        setSortedData(transform(res));
    };

    const sortDir = (index) => {
        if (index == sortIndex) {
            return sortAsc ? '▼' : '▲';
        }
        return '';
    };

    return (
        <table className={`text-center ${className ?? ''}`}>
            <tbody>
                <tr className="bg-slate-500 text-white">
                    {headings.map((heading, index) => (
                        <th
                            key={`heading-${index}`}
                            className={index == sortIndex ? 'bg-slate-700' : ''}
                            onClick={() => setSort(index)}
                        >
                            {heading} {sortDir(index)}
                        </th>
                    ))}
                </tr>
                {sortedData.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`} className="even:bg-slate-200">
                        {(sortAsc
                            ? row
                            : sortedData[sortedData.length - 1 - rowIndex]
                        ).map((entry, entryIndex) => (
                            <td key={`entry-${rowIndex}-${entryIndex}`}>
                                {entry}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
