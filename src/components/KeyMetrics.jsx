import React from 'react';
import Section from './Section';
import MetricEntry from './MetricEntry';

function KeyMetrics(props) {
  return (
    <Section testId="key-metrics" title="Key Metrics">
      <ul className="flex flex-col lg:flex-row justify-between mx-4 my-2">
        <MetricEntry
          testId="active-users"
          label="Active Users"
          value={`${props.activeUsers}/${props.totalUsers}`}
        />
        <MetricEntry
          testId="total-streams"
          label="Total Streams"
          value={props.totalStreams}
        />
        <MetricEntry
          testId="total-revenue"
          label="Revenue"
          value={`$${props.revenue}`}
        />
        <MetricEntry
          testId="top-artist"
          label="Top Artist"
          value={props.topArtist?.username}
        />
      </ul>
    </Section>
  );
}

export default KeyMetrics;
