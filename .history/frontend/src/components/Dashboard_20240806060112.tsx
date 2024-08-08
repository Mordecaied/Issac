import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import Timer from './Timer';
import QuestionList from './QuestionList';
import IssueList from './IssueList';

const Dashboard: React.FC = () => {
  const { timers, addTimer, updateTimer, deleteTimer } = useAppContext();
  const [newTimerName, setNewTimerName] = useState('');
  const [expandedTimerId, setExpandedTimerId] = useState<number | null>(null);

  const handleCreateTimer = () => {
    if (newTimerName.trim() !== '') {
      addTimer({
        id: Date.now(),
        projectName: newTimerName,
        time: 0,
        isRunning: false
      });
      setNewTimerName('');
    }
  };

  const handleToggleExpand = (id: number) => {
    setExpandedTimerId(expandedTimerId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <input
          type="text"
          value={newTimerName}
          onChange={(e) => setNewTimerName(e.target.value)}
          placeholder="New Timer Name"
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleCreateTimer}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150"
        >
          Create Timer
        </button>
      </div>
      {timers.map(timer => (
        <div key={timer.id} className="bg-white shadow-md rounded-lg p-6">
          <Timer timer={timer} onUpdate={updateTimer} onDelete={deleteTimer} />
          <button
            onClick={() => handleToggleExpand(timer.id)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150"
          >
            {expandedTimerId === timer.id ? 'Collapse' : 'Expand'}
          </button>
          {expandedTimerId === timer.id && (
            <div className="mt-4">
              <QuestionList timerId={timer.id} />
              <IssueList timerId={timer.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;