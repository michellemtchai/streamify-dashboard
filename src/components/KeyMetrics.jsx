function KeyMetrics(props) {
  return (
    <section>
      <h3>Key Metrics</h3>
      <ul>
        <ol>
          <strong>Active Users</strong>
          {props.activeUsers}/{props.totalUsers}
        </ol>
        <ol>
          <strong>Total Streams</strong>
          {props.totalStreams}
        </ol>
        <ol>
          <strong>Revenue</strong>${props.revenue}
        </ol>
        <ol>
          <strong>Top Artist</strong>
          {props.topArtist?.username}
        </ol>
      </ul>
    </section>
  );
}

export default KeyMetrics;
