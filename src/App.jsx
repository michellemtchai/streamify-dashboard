import server from './server';
import { useState, useEffect } from 'react';
import Page from './components/Page';
import Visualization from './components/Visualization';
import KeyMetrics from './components/KeyMetrics';
import UserGrowth from './components/UserGrowth';
import Revenue from './components/Revenue';
import RecentStreams from './components/RecentStreams';
import Loader from './components/Loader';
import { resourceUrls } from './utils/constants';

function App() {
  let [metrics, setMetrics] = useState({});
  let [userGrowth, setUserGrowth] = useState({});
  let [revenue, setRevenue] = useState({});
  let [top5, setTop5] = useState([]);
  let [recent, setRecent] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    let actions = [setMetrics, setUserGrowth, setRevenue, setTop5, setRecent];
    setLoading(true);
    Promise.all(
      resourceUrls.map((url) => {
        return fetch(url).then((resp) => resp.json());
      }),
    ).then((results) => {
      results.map((res, index) => actions[index](res));
      setLoading(false);
    });
  }, []);

  return (
    <Page>
      {loading ? (
        <Loader />
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
      )}
    </Page>
  );
}

export default App;
