import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import TimeTracking from './components/TimeTracking';
import QuestionTracking from './components/QuestionTracking';
import IssueTracking from './components/IssueTracking';

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
      default:
        return null;
    }
  };

  return (
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
        </div>
      </div>
      {renderContent()}
    </Layout>
  );
};

const QuestionView: React.FC = () => {
  // Implement a view that shows questions grouped by projects
  return <div>Question View (To be implemented)</div>;
};

const IssueView: React.FC = () => {
  // Implement a view that shows issues grouped by projects
  return <div>Issue View (To be implemented)</div>;
};

export default App;