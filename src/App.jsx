import server from './server';
import React, { useState, useEffect } from 'react';
import KeyMetrics from './components/KeyMetrics';
import UserGrowth from './components/UserGrowth';
import Revenue from './components/Revenue';
import Table from './components/Table';
import { streamTableHeadings } from './utils/constants';
import { transformStreamData } from './utils/transform';

function App() {
  let [metrics, setMetrics] = useState({});
  let [userGrowth, setUserGrowth] = useState({});
  let [revenue, setRevenue] = useState({});
  let [top5, setTop5] = useState([]);
  let [recent, setRecent] = useState([]);

  useEffect(() => {
    fetch('/api/user/metrics')
      .then((response) => response.json())
      .then((json) => setMetrics(json));
    fetch('/api/user/growth')
      .then((response) => response.json())
      .then((json) => setUserGrowth(json));
    fetch('/api/user/revenue')
      .then((response) => response.json())
      .then((json) => setRevenue(json));
    fetch('/api/streams/top5')
      .then((response) => response.json())
      .then((json) => setTop5(json));
    fetch('/api/streams/recent')
      .then((response) => response.json())
      .then((json) => setRecent(json));
  }, [server.shutdown]);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <KeyMetrics {...metrics} />
      <UserGrowth {...userGrowth} />
      <Revenue {...revenue} />
      <Table
        title="Top 5 Streams"
        headings={streamTableHeadings}
        data={transformStreamData(top5)}
      />
      <Table
        title="Recent Streams"
        headings={streamTableHeadings}
        data={transformStreamData(recent)}
      />
    </>
  );
}

export default App;
