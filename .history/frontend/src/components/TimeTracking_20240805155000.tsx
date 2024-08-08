import React, { useState, useEffect } from 'react';

interface TimeTrackerProps {
  projectName: string;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ projectName }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">{projectName}</h2>
      <div className="text-4xl font-bold mb-4">{formatTime(time)}</div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleStart}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Start
        </button>
        <button
          onClick={handlePause}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Pause
        </button>
        <button
          onClick={handleStop}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Stop
        </button>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Continue Session
      </button>
    </div>
  );
};

const TimeTracking: React.FC = () => {
  return (
    <div>
      <TimeTracker projectName="Project 1" />
      <TimeTracker projectName="Project 1" />
      <TimeTracker projectName="Project 1" />
      <TimeTracker projectName="Project 1" />
      <TimeTracker projectName="Project 1" />
    </div>
  );
};

export default TimeTracking;