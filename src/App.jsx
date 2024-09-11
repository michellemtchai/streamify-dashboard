import server from './server';
import React, { useState, useEffect } from 'react';
import Page from './components/Page';
import Visualization from './components/Visualization';
import KeyMetrics from './components/KeyMetrics';
import UserGrowth from './components/UserGrowth';
import Revenue from './components/Revenue';
import RecentStreams from './components/RecentStreams';

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
    <Page>
      <KeyMetrics {...metrics} />
      <Visualization revenue={revenue} userGrowth={userGrowth} top5={top5} />
      <RecentStreams data={recent} />
    </Page>
  );
}

export default App;
