import React, { useState } from 'react';
import { AppProvider } from './AppContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TimeTracking from './components/TimeTracking';
import QuestionTracking from './components/QuestionTracking';
import IssueTracking from './components/IssueTracking';
import TimeSummary from './components/TimeSummary';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'time':
        return <TimeTracking />;
      case 'questions':
        return <QuestionTracking />;
      case 'issues':
        return <IssueTracking />;
      case 'summary':
        return <TimeSummary />;
      default:
        return null;
    }
  };

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
          </div>
        </div>
        {renderContent()}
      </Layout>
    </AppProvider>
  );
};

export default App;