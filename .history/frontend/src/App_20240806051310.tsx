import React, { useState } from 'react';
import Layout from './components/Layout';
import TimeTracker from './components/TimeTracker';
import QuestionTracking from './components/QuestionTracking';
import IssueTracking from './components/IssueTracking';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('time');

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'time' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
            onClick={() => setActiveTab('time')}
          >
            Time Tracking
          </button>
          <button
            className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'question' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
            onClick={() => setActiveTab('question')}
          >
            Question Tracking
          </button>
          <button
            className={`px-4 py-2 rounded transition duration-150 ${activeTab === 'issue' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'}`}
            onClick={() => setActiveTab('issue')}
          >
            Issue Tracking
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 pr-4">
          <TimeTracker />
        </div>
        <div className="w-1/2 pl-4">
          {activeTab === 'time' && <TimeTracker />}
          {activeTab === 'question' && <QuestionTracking />}
          {activeTab === 'issue' && <IssueTracking />}
        </div>
      </div>
    </Layout>
  );
};

export default App;