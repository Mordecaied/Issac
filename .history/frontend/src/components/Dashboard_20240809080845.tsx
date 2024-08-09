import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TimerCard from './TimerCard';
import TimeTracking from './TimeTracking';
import QuestionTracking from './QuestionTracking';
import IssueTracking from './IssueTracking';
import TimeSummary from './TimeSummary';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'time-tracking':
        return <TimeTracking />;
      case 'question-tracking':
        return <QuestionTracking />;
      case 'issue-tracking':
        return <IssueTracking />;
      case 'time-summary':
        return <TimeSummary />;
      default:
        return <TimerCard showQuestionsAndIssues={true} />;
    }
  };

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-100 p-4">
        <h1 className="text-xl font-bold mb-4">Productivity Assistant</h1>
        <div className="space-y-2">
          {['dashboard', 'time-tracking', 'question-tracking', 'issue-tracking', 'time-summary'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`w-full p-2 text-left rounded ${
                activeView === view ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'
              }`}
            >
              {view.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </nav>
      <main className="flex-1 overflow-y-auto p-4">
        <h2 className="text-2xl font-bold mb-4">{activeView.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
        {renderView()}
      </main>
    </div>
  );
};

export default Dashboard;