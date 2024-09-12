import StreamTable from './StreamTable';
import Section from './Section';
import FilterOptions from './FilterOptions';
import { streamTableFiltering } from '../utils/filtering';
import {
    streamTableHeadings,
    streamTableFilterTypes,
    streamTableEntryKeys,
} from '../utils/constants';
import { dataMinMax } from '../utils/math';

function RecentStreams({ data }) {
    let { min, max } = dataMinMax(
        data,
        ['streamCount', 'userId'],
        streamTableEntryKeys,
    );
    return (
        <Section title="Recent Streams" className="flex flex-col">
            <FilterOptions
                name="recent-streams"
                data={data}
                filtering={streamTableFiltering}
                renderTable={(filteredData) => (
                    <StreamTable className="m-4" data={filteredData} />
                )}
                labels={streamTableHeadings}
                types={streamTableFilterTypes}
                min={min}
                max={max}
            />
        </Section>
    );
}

export default RecentStreams;
