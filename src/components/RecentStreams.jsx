import StreamTable from './StreamTable';
import Section from './Section';

function RecentStreams({ data }) {
    return (
        <Section title="Recent Streams" className="flex flex-col">
            <StreamTable className="m-4" data={data} />
        </Section>
    );
}

export default RecentStreams;
