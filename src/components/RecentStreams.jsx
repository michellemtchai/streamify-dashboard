import Table from './Table';
import Section from './Section';
import { transformStreamData } from '../utils/transform';
import { streamTableHeadings } from '../utils/constants';

function RecentStreams({ data }) {
    return (
        <Section title="Recent Streams" className="flex flex-col">
            <Table
                className="m-4"
                headings={streamTableHeadings}
                data={transformStreamData(data)}
            />
        </Section>
    );
}

export default RecentStreams;
