import React from 'react';
import { useAppContext, Timer } from '../AppContext';

const TimeSummary: React.FC = () => {
  const { timers } = useAppContext();

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const calculateTotalTime = (timer: Timer): number => {
    return timer.time + (timer.subTimers?.reduce((acc: number, sub: SubTimer) => acc + sub.time, 0) || 0);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {timers.map(timer => (
        <div key={timer.id} className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">{timer.projectName}</h2>
          <p className="text-4xl font-bold">{formatTime(calculateTotalTime(timer))}</p>
        </div>
      ))}
    </div>
  );
};

export default TimeSummary;