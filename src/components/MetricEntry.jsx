import React from 'react';

function MetricEntry({ label, value }) {
  return (
    <li className="text-3xl my-2">
      <strong className="block text-base">{label}</strong>
      {value}
    </li>
  );
}

export default MetricEntry;
