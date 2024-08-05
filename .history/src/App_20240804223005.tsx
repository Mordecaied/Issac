import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import { AppProvider } from './contexts/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Dashboard />
      </div>
    </AppProvider>
  );
};

export default App;