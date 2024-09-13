import React from 'react';

function MetricEntry({ testId, label, value }) {
  return (
    <li data-testid={testId} className="text-3xl my-2">
      <strong className="block text-base">{label}</strong>
      {value}
    </li>
  );
}

export default MetricEntry;
