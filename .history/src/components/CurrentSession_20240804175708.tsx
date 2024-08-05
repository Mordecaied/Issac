import React, { useEffect, useState } from 'react';
import { ClockIcon } from '@heroicons/react/solid';
import { useAppContext } from '../AppContext';

const CurrentSession: React.FC = () => {
  const { activeSession, topics } = useAppContext();
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeSession) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeTopic = topics.find((topic) => topic.id === activeSession);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <ClockIcon className="h-6 w-6 mr-2 text-green-500" />
        Current Session
      </h2>
      {activeTopic ? (
        <div>
          <p className="text-lg font-medium">{activeTopic.name}</p>
          <p className="text-3xl font-bold mt-2">{formatTime(elapsedTime)}</p>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No active session</p>
      )}
    </div>
  );
};

export default CurrentSession;