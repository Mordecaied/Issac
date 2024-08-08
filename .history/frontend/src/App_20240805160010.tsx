import React from 'react';
import Layout from './components/Layout';
import TimeTracking from './components/TimeTracking';

const App: React.FC = () => {
  return (
    <Layout>
      <TimeTracking />
    </Layout>
  );
};

export default App;