import Section from './Section';

function Table({ headings, data, className }) {
    return (
        <table className={`text-center ${className ?? ''}`}>
            <tbody>
                <tr className="bg-slate-500 text-white">
                    {headings.map((heading, index) => (
                        <th key={`heading-${index}`}>{heading}</th>
                    ))}
                </tr>
                {data.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`} className="even:bg-slate-200">
                        {row.map((entry, entryIndex) => (
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
