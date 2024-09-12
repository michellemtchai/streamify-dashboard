import { useState, useEffect } from 'react';

function Table({ headings, data, sorting, transform, className, minWidth }) {
    let [sortAsc, setSortAsc] = useState(true);
    let [sortIndex, setSortIndex] = useState(0);
    let [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        let res = sorting[sortIndex](data);
        setSortedData(transform(res));
    }, [data]);

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
            return sortAsc ? '▲' : '▼';
        }
        return '';
    };

    const headingStyle = (index) => {
        if (index == sortIndex) {
            return 'cursor-pointer bg-slate-700';
        }
        return 'cursor-pointer';
    };

    return (
        <div className="overflow-x-auto flex scroll-m-0">
            <table
                className={`flex-1 text-center shadow-md ${className ?? ''}`}
                style={{ minWidth }}
            >
                <tbody>
                    <tr className="bg-slate-500 text-white">
                        {headings.map((heading, index) => (
                            <th
                                key={`heading-${index}`}
                                className={headingStyle(index)}
                                onClick={() => setSort(index)}
                            >
                                {heading} {sortDir(index)}
                            </th>
                        ))}
                    </tr>
                    {sortedData.map((row, rowIndex) => (
                        <tr
                            key={`row-${rowIndex}`}
                            className="even:bg-slate-200"
                        >
                            {(sortAsc
                                ? row
                                : sortedData[sortedData.length - 1 - rowIndex]
                            ).map((entry, entryIndex) => (
                                <td
                                    key={`entry-${rowIndex}-${entryIndex}`}
                                    className="text-ellipsis break-words"
                                >
                                    {entry}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
