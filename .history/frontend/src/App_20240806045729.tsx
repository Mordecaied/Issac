import React, { useState } from 'react';
import Layout from './components/Layout';
import TimeTracking from './components/TimeTracking';
import QuestionTracking from './components/QuestionTracking';
import IssueTracking from './components/IssueTracking';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('time');

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${activeTab === 'time' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('time')}
          >
            Time Tracking
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'question' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('question')}
          >
            Question Tracking
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === 'issue' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('issue')}
          >
            Issue Tracking
          </button>
        </div>
      </div>
      {activeTab === 'time' && <TimeTracking />}
      {activeTab === 'question' && <QuestionTracking />}
      {activeTab === 'issue' && <IssueTracking />}
    </Layout>
  );
};

export default App;