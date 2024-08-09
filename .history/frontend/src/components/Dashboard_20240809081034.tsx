import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import TimeTracking from './TimeTracking';
import QuestionTracking from './QuestionTracking';
import IssueTracking from './IssueTracking';
import TimeSummary from './TimeSummary';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('time-tracking');
  const { timers, questions, issues } = useAppContext();

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
        return <TimeTracking />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg p-4">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Productivity Assistant</h1>
        <ul className="space-y-2">
          {[
            { id: 'time-tracking', label: 'Time Tracking', count: timers.length },
            { id: 'question-tracking', label: 'Questions', count: questions.length },
            { id: 'issue-tracking', label: 'Issues', count: issues.length },
            { id: 'time-summary', label: 'Time Summary', count: null },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id)}
                className={`w-full text-left px-4 py-2 rounded transition-colors duration-150 ${
                  activeView === item.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-blue-100'
                }`}
              >
                {item.label}
                {item.count !== null && (
                  <span className="float-right bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {activeView.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </h2>
        {renderView()}
      </main>
    </div>
  );
};

export default Dashboard;