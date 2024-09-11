import StreamTable from './StreamTable';
import Figure from './Figure';

function Top5Streams({ data }) {
    return (
        <Figure title="Top 5 Streams" className="my-4 flex flex-col">
            <StreamTable className="flex-1 m-3" data={data} />
        </Figure>
    );
}

export default Top5Streams;
