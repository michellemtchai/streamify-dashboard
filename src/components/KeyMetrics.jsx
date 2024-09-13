import React from 'react';
import Section from './Section';
import MetricEntry from './MetricEntry';

function KeyMetrics(props) {
  return (
    <Section title="Key Metrics">
      <ul className="flex flex-col lg:flex-row justify-between mx-4 my-2">
        <MetricEntry
          label="Active Users"
          value={`${props.activeUsers}/${props.totalUsers}`}
        />
        <MetricEntry label="Total Streams" value={props.totalStreams} />
        <MetricEntry label="Revenue" value={`$${props.revenue}`} />
        <MetricEntry label="Top Artist" value={props.topArtist?.username} />
      </ul>
    </Section>
  );
}

export default KeyMetrics;
