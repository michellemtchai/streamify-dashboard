function MetricEntry({ label, value }) {
  return (
    <li className="text-3xl">
      <strong className="block text-base">{label}</strong>
      {value}
    </li>
  );
}

export default MetricEntry;
