import server from './server';
import { useState, useEffect, Suspense, lazy } from 'react';
import Page from './components/Page';
import Loader from './components/Loader';
import ServerError from './components/ServerError';
import { resourceUrls, dashBoardDataKeys } from './utils/constants';

const DashBoard = lazy(() => import('./pages/DashBoard'));

function App() {
  let [dashBoardData, setDashboardData] = useState({});
  let [loading, setLoading] = useState(false);
  let [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all(
      resourceUrls.map((url) => {
        return fetch(url)
          .then((resp) => resp.json())
          .catch((e) => setHasError(true));
      }),
    ).then((results) => {
      let data = {};
      for (let i = 0; i < results.length; i++) {
        data[dashBoardDataKeys[i]] = results[i];
      }
      setDashboardData(data);
      setLoading(false);
    });
  }, []);

  return (
    <Page>
      {loading ? (
        <Loader />
      ) : (
        <Suspense fallback={<ServerError />}>
          <DashBoard {...dashBoardData} hasError={hasError} />
        </Suspense>
      )}
    </Page>
  );
}

export default App;
