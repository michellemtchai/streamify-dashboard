import StreamTable from './StreamTable';
import Section from './Section';
import FilterOptions from './FilterOptions';
import { streamTableFiltering } from '../utils/filtering';
import { streamTableFilterOptions } from '../utils/constants';

function RecentStreams({ data }) {
    return (
        <Section title="Recent Streams" className="flex flex-col">
            <FilterOptions
                id="recent-streams"
                data={data}
                filtering={streamTableFiltering}
                renderTable={(filteredData) => (
                    <StreamTable className="m-4" data={filteredData} />
                )}
                options={streamTableFilterOptions}
            />
        </Section>
    );
}

export default RecentStreams;
