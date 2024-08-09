import React from 'react';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
};

export default App;