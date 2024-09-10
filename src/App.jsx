import setupServer from './server';
import React, { useState, useEffect } from 'react';

setupServer();

function App() {
  let [metrics, setMetrics] = useState({});

  useEffect(() => {
    fetch('/api/user/metrics')
      .then((response) => response.json())
      .then((json) => setMetrics(json));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>{JSON.stringify(metrics, null, 2)}</p>
    </>
  );
}

export default App;
