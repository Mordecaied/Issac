import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import QuestionList from './QuestionList';
import IssueList from './IssueList';
import TimerCard from './TimerCard';

const Dashboard: React.FC = () => {
  const { timers, addTimer } = useAppContext();
  const [expandedTimerId, setExpandedTimerId] = useState<number | null>(null);
  const [newTimerName, setNewTimerName] = useState('');

  const handleCreateTimer = () => {
    if (newTimerName.trim() !== '') {
      addTimer({
        id: Date.now(),
        projectName: newTimerName,
        time: 0,
        isRunning: false,
        subTimers: [],
        lastUpdated: new Date().toISOString()
      });
      setNewTimerName('');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          value={newTimerName}
          onChange={(e) => setNewTimerName(e.target.value)}
          placeholder="New Timer Name"
          className="flex-grow p-2 border rounded mr-2"
        />
        <button
          onClick={handleCreateTimer}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Timer
        </button>
      </div>
      {timers.map(timer => (
        <div key={timer.id}>
          <TimerCard 
            timer={timer} 
            isExpanded={expandedTimerId === timer.id}
            onToggleExpand={() => setExpandedTimerId(expandedTimerId === timer.id ? null : timer.id)}
          />
          {expandedTimerId === timer.id && (
            <div className="mt-4 ml-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-semibold mb-2">Questions</h3>
                  <QuestionList timerId={timer.id} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-semibold mb-2">Issues</h3>
                  <IssueList timerId={timer.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;