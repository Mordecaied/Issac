import React, { useState } from 'react';
import { useAppContext } from './AppContext';
import Timer from './Timer';

const TimeTracking: React.FC = () => {
  const { timers, addTimer, updateTimer, deleteTimer } = useAppContext();
  const [newTimerName, setNewTimerName] = useState('');

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
        <Timer
          key={timer.id}
          timer={timer}
          onToggle={() => updateTimer({ ...timer, isRunning: !timer.isRunning })}
          onDelete={() => deleteTimer(timer.id)}
        />
      ))}
    </div>
  );
};

export default TimeTracking;