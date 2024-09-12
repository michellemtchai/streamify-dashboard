import server from './server';
import { useState, useEffect, Suspense, lazy } from 'react';
import Page from './components/Page';
import Loader from './components/Loader';
import ServerError from './components/ServerError';
import { resourceUrls } from './utils/constants';

const DashBoard = lazy(() => import('./pages/DashBoard'));

function App() {
  let [metrics, setMetrics] = useState({});
  let [userGrowth, setUserGrowth] = useState({});
  let [revenue, setRevenue] = useState({});
  let [top5, setTop5] = useState([]);
  let [recent, setRecent] = useState([]);
  let [loading, setLoading] = useState(false);
  let [hasError, setHasError] = useState(false);

  useEffect(() => {
    let actions = [setMetrics, setUserGrowth, setRevenue, setTop5, setRecent];
    setLoading(true);
    Promise.all(
      resourceUrls.map((url) => {
        return fetch(url)
          .then((resp) => resp.json())
          .catch((e) => setHasError(true));
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
        <Suspense fallback={<ServerError />}>
          <DashBoard
            metrics={metrics}
            userGrowth={userGrowth}
            revenue={revenue}
            top5={top5}
            recent={recent}
            hasError={hasError}
          />
        </Suspense>
      )}
    </Page>
  );
}

export default App;
