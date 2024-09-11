function Table({ title, headings, data }) {
    return (
        <section>
            <h3>{title}</h3>
            <table>
                <tbody>
                    <tr>
                        {headings.map((heading, index) => (
                            <th key={`heading-${index}`}>{heading}</th>
                        ))}
                    </tr>
                    {data.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>
                            {row.map((entry, entryIndex) => (
                                <td key={`entry-${rowIndex}-${entryIndex}`}>
                                    {entry}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Table;
