import React from 'react';
import Section from './Section';
import Revenue from './Revenue';
import UserGrowth from './UserGrowth';
import Top5Streams from './Top5Streams';

function Visualization({ revenue, userGrowth, top5 }) {
    return (
        <Section
            testId="data-visualization"
            className="flex lg:flex-row flex-col"
        >
            <Revenue {...revenue} />
            <div className="flex flex-col lg:flex-1 w-11/12 m-auto overflow-hidden">
                <UserGrowth {...userGrowth} />
                <Top5Streams data={top5} />
            </div>
        </Section>
    );
}

export default Visualization;
