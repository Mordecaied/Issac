import React, { useState, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import TimerCard from './TimerCard';

const TimeTracking: React.FC = () => {
  const { timers, addTimer } = useAppContext();
  const [newTimerName, setNewTimerName] = useState('');

  const handleCreateTimer = useCallback(() => {
    if (newTimerName.trim() !== '') {
      // Check if a timer with this name already exists
      const timerExists = timers.some(timer => timer.projectName.toLowerCase() === newTimerName.trim().toLowerCase());
      
      if (!timerExists) {
        addTimer({
          id: Date.now(),
          projectName: newTimerName.trim(),
          time: 0,
          isRunning: false,
          subTimers: [],
          lastUpdated: new Date().toISOString()
        });
        setNewTimerName('');
      } else {
        // Optionally, show an error message to the user
        alert('A timer with this name already exists!');
      }
    }
  }, [newTimerName, timers, addTimer]);

  return (
    <div className="space-y-4">
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
        <TimerCard
          key={timer.id}
          timer={timer}
          showQuestionsAndIssues={false}
        />
      ))}
    </div>
  );
};

export default TimeTracking;