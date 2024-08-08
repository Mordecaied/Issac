import React, { useState } from 'react';
import { Timer, SubTimer, useAppContext } from '../context/AppContext';
import QuestionList from './QuestionList';
import IssueList from './IssueList';

interface TimerCardProps {
  timer: Timer;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const TimerCard: React.FC<TimerCardProps> = ({ timer, isExpanded, onToggleExpand }) => {
  const { updateTimer, deleteTimer, addSubTimer, updateSubTimer } = useAppContext();
  const [newSubTimerName, setNewSubTimerName] = useState('');

  const handleToggleTimer = () => {
    updateTimer({ ...timer, isRunning: !timer.isRunning });
  };

  const handleToggleSubTimer = (subTimer: SubTimer) => {
    updateSubTimer(timer.id, { ...subTimer, isRunning: !subTimer.isRunning });
  };

  const handleAddSubTimer = () => {
    if (newSubTimerName.trim() !== '') {
      addSubTimer(timer.id, {
        id: Date.now(),
        name: newSubTimerName,
        time: 0,
        isRunning: false,
        lastUpdated: new Date().toISOString()
      });
      setNewSubTimerName('');
    }
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{timer.projectName}</h2>
          <div className="text-3xl font-bold">{formatTime(timer.time)}</div>
        </div>
        <div className="flex space-x-2 mb-4">
          <button
            onClick={handleToggleTimer}
            className={`px-4 py-2 rounded text-white ${
              timer.isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {timer.isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => deleteTimer(timer.id)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Delete
          </button>
          <button
            onClick={onToggleExpand}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="text-lg font-semibold mb-2">Sub-timers</h3>
              {timer.subTimers.map(subTimer => (
                <div key={subTimer.id} className="flex items-center justify-between mb-2 bg-white p-2 rounded shadow">
                  <span className="font-medium">{subTimer.name}: {formatTime(subTimer.time)}</span>
                  <button
                    onClick={() => handleToggleSubTimer(subTimer)}
                    className={`px-2 py-1 rounded text-white ${
                      subTimer.isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {subTimer.isRunning ? 'Pause' : 'Start'}
                  </button>
                </div>
              ))}
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value={newSubTimerName}
                  onChange={(e) => setNewSubTimerName(e.target.value)}
                  placeholder="New Sub-timer Name"
                  className="flex-grow p-2 border rounded mr-2"
                />
                <button
                  onClick={handleAddSubTimer}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Sub-timer
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Questions</h3>
                <QuestionList timerId={timer.id} />
              </div>
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="text-lg font-semibold mb-2">Issues</h3>
                <IssueList timerId={timer.id} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerCard;