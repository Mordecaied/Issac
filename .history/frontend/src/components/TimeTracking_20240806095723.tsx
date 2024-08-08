import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';

const TimeTracking: React.FC = () => {
  const { timers, addTimer, updateTimer, deleteTimer, addSubTimer, updateSubTimer } = useAppContext();
  const [newTimerName, setNewTimerName] = useState('');
  const [expandedTimerId, setExpandedTimerId] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      timers.forEach(timer => {
        if (timer.isRunning) {
          updateTimer({ ...timer, time: timer.time + 1 });
        }
        timer.subTimers.forEach(subTimer => {
          if (subTimer.isRunning) {
            updateSubTimer(timer.id, { ...subTimer, time: subTimer.time + 1 });
          }
        });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timers, updateTimer, updateSubTimer]);

  const handleCreateTimer = () => {
    if (newTimerName.trim() !== '') {
      addTimer({
        id: Date.now(),
        projectName: newTimerName,
        time: 0,
        isRunning: false,
        subTimers: [],
        lastUpdated: new Date().toISOString() // Add this line
      });
      setNewTimerName('');
    }
  };

  const handleToggleTimer = (id: number) => {
    const timer = timers.find(t => t.id === id);
    if (timer) {
      updateTimer({ ...timer, isRunning: !timer.isRunning });
    }
  };

  const handleToggleSubTimer = (parentId: number, subTimerId: number) => {
    const timer = timers.find(t => t.id === parentId);
    if (timer) {
      const subTimer = timer.subTimers.find(st => st.id === subTimerId);
      if (subTimer) {
        updateSubTimer(parentId, { ...subTimer, isRunning: !subTimer.isRunning });
      }
    }
  };

  const handleAddSubTimer = (parentId: number) => {
    const subTimerName = prompt("Enter sub-timer name:");
    if (subTimerName) {
      addSubTimer(parentId, {
        id: Date.now(),
        name: subTimerName,
        time: 0,
        isRunning: false,
        lastUpdated: new Date().toISOString() // Add this line
      });
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{timer.projectName}</h2>
            <div className="text-3xl font-bold">{formatTime(timer.time)}</div>
          </div>
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => handleToggleTimer(timer.id)}
              className={`px-4 py-2 rounded text-white transition duration-150 ${
                timer.isRunning
                  ? 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                  : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
              }`}
            >
              {timer.isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => deleteTimer(timer.id)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 active:bg-gray-700 transition duration-150"
            >
              Delete
            </button>
            <button
              onClick={() => handleToggleExpand(timer.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150"
            >
              {expandedTimerId === timer.id ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {expandedTimerId === timer.id && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Sub-timers</h3>
              {timer.subTimers.map(subTimer => (
                <div key={subTimer.id} className="flex items-center justify-between mb-2">
                  <span>{subTimer.name}: {formatTime(subTimer.time)}</span>
                  <button
                    onClick={() => handleToggleSubTimer(timer.id, subTimer.id)}
                    className={`px-2 py-1 rounded text-white ${
                      subTimer.isRunning ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  >
                    {subTimer.isRunning ? 'Pause' : 'Start'}
                  </button>
                </div>
              ))}
              <button onClick={() => handleAddSubTimer(timer.id)} className="bg-blue-500 text-white px-2 py-1 rounded">
                Add Sub-timer
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimeTracking;