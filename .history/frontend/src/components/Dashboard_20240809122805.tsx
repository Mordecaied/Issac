import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import TimeTracking from './TimeTracking';
import QuestionTracking from './QuestionTracking';
import IssueTracking from './IssueTracking';
import TimeSummary from './TimeSummary';
import TimeVisualization from './TimeVisualization';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('time-tracking');
  const { timers, questions, issues, resetAllData } = useAppContext();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.altKey) {
        switch (event.key) {
          case 't':
            setActiveView('time-tracking');
            break;
          case 'q':
            setActiveView('question-tracking');
            break;
          case 'i':
            setActiveView('issue-tracking');
            break;
          case 's':
            setActiveView('time-summary');
            break;
          case 'v':
            setActiveView('time-visualization');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

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
      case 'time-visualization':
        return <TimeVisualization />;
      default:
        return <TimeTracking />;
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      resetAllData();
    }
  };

  const navItems = [
    { id: 'time-tracking', label: 'Time Tracking', count: timers.length, shortcut: 'Alt+T' },
    { id: 'question-tracking', label: 'Questions', count: questions.length, shortcut: 'Alt+Q' },
    { id: 'issue-tracking', label: 'Issues', count: issues.length, shortcut: 'Alt+I' },
    { id: 'time-summary', label: 'Time Summary', count: null, shortcut: 'Alt+S' },
    { id: 'time-visualization', label: 'Time Visualization', count: null, shortcut: 'Alt+V' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-lg p-4">
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Productivity Assistant</h1>
        <ul className="space-y-2">
          {navItems.map((item) => (
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
                <span className="float-right mr-2 text-xs text-gray-500">{item.shortcut}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleReset}
          className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset All Data
        </button>
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