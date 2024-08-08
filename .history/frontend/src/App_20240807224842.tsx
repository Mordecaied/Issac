import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TimeTracking from './components/TimeTracking';
import QuestionTracking from './components/QuestionTracking';
import IssueTracking from './components/IssueTracking';
import TimeSummary from './components/TimeSummary';
import AuthPage from './components/AuthPage';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAuthenticated, logout, checkAuthStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await checkAuthStatus();
      setIsLoading(false);
    };
    initAuth();
  }, [checkAuthStatus]);

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <AuthPage />;
    }

    return (
      <AppProvider>
        <Layout>
          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                Dashboard
              </button>
              <button
                className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'time' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
                onClick={() => setActiveTab('time')}
              >
                Time Tracking
              </button>
              <button
                className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'questions' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
                onClick={() => setActiveTab('questions')}
              >
                Question Tracking
              </button>
              <button
                className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'issues' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
                onClick={() => setActiveTab('issues')}
              >
                Issue Tracking
              </button>
              <button
                className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'summary' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
                onClick={() => setActiveTab('summary')}
              >
                Time Summary
              </button>
              <button
                className="px-4 py-2 rounded transition duration-150 bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'time' && <TimeTracking />}
          {activeTab === 'questions' && <QuestionTracking />}
          {activeTab === 'issues' && <IssueTracking />}
          {activeTab === 'summary' && <TimeSummary />}
        </Layout>
      </AppProvider>
    );
  };

  return renderContent();
};

export default App;