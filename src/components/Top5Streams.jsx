import Table from './Table';
import Figure from './Figure';
import { transformStreamData } from '../utils/transform';
import { streamTableHeadings } from '../utils/constants';

function Top5Streams({ data }) {
    return (
        <Figure title="Top 5 Streams" className="my-4 flex flex-col">
            <Table
                className="flex-1 m-3"
                headings={streamTableHeadings}
                data={transformStreamData(data)}
            />
        </Figure>
    );
}

export default Top5Streams;
