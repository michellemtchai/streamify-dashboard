import React from 'react';
import Visualization from '../components/Visualization';
import KeyMetrics from '../components/KeyMetrics';
import UserGrowth from '../components/UserGrowth';
import Revenue from '../components/Revenue';
import RecentStreams from '../components/RecentStreams';

const SuspenseTrigger = () => {
    throw new Promise(() => {});
};

function DashBoard({ metrics, revenue, userGrowth, top5, recent, hasError }) {
    return hasError ? (
        <SuspenseTrigger />
    ) : (
        <>
            <KeyMetrics {...metrics} />
            <Visualization
                revenue={revenue}
                userGrowth={userGrowth}
                top5={top5}
            />
            <RecentStreams data={recent} />
        </>
    );
}

export default DashBoard;
