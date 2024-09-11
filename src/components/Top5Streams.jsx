import Table from './Table';
import Figure from './Figure';
import { transformStreamData } from '../utils/transform';
import { streamTableHeadings } from '../utils/constants';
import { streamTableSorting } from '../utils/sorting';

function Top5Streams({ data }) {
    return (
        <Figure title="Top 5 Streams" className="my-4 flex flex-col">
            <Table
                className="flex-1 m-3"
                headings={streamTableHeadings}
                transform={transformStreamData}
                data={data}
                sorting={streamTableSorting}
            />
        </Figure>
    );
}

export default Top5Streams;
