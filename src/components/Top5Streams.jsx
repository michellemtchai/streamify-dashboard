import React from 'react';
import StreamTable from './StreamTable';
import Figure from './Figure';

function Top5Streams({ data }) {
    return (
        <Figure title="Top 5 Streams" className="my-4 flex-1">
            <StreamTable
                testId="top5-streams-table"
                className="w-full m-3"
                data={data}
            />
        </Figure>
    );
}

export default Top5Streams;
