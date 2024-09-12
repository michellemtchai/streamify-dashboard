import Table from './Table';
import { transformStreamData } from '../utils/transform';
import { streamTableHeadings } from '../utils/constants';
import { streamTableSorting } from '../utils/sorting';

function StreamTable({ data, className }) {
    return (
        <Table
            className={className}
            headings={streamTableHeadings}
            transform={transformStreamData}
            data={data}
            sorting={streamTableSorting}
            minWidth={700}
        />
    );
}

export default StreamTable;
