import Table from './Table';
import Section from './Section';
import { transformStreamData } from '../utils/transform';
import { streamTableHeadings } from '../utils/constants';
import { streamTableSorting } from '../utils/sorting';

function RecentStreams({ data }) {
    return (
        <Section title="Recent Streams" className="flex flex-col">
            <Table
                className="m-4"
                headings={streamTableHeadings}
                transform={transformStreamData}
                data={data}
                sorting={streamTableSorting}
            />
        </Section>
    );
}

export default RecentStreams;
