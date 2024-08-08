import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

type TimeRange = 'all' | 'year' | 'month' | 'day';

const TimeSummary: React.FC = () => {
  const { timers } = useAppContext();
  const [timeRange, setTimeRange] = useState<TimeRange>('all');

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const isWithinTimeRange = (date: Date): boolean => {
    const now = new Date();
    switch (timeRange) {
      case 'year':
        return date.getFullYear() === now.getFullYear();
      case 'month':
        return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
      case 'day':
        return date.toDateString() === now.toDateString();
      default:
        return true;
    }
  };

  const calculateTotalTime = (timer: Timer): number => {
    const filterTime = (time: number, date: Date) => isWithinTimeRange(date) ? time : 0;
    
    const mainTimerTime = filterTime(timer.time, new Date(timer.lastUpdated));
    const subTimersTime = timer.subTimers?.reduce((acc: number, sub: SubTimer) => 
      acc + filterTime(sub.time, new Date(sub.lastUpdated)), 0) || 0;
    
    return mainTimerTime + subTimersTime;
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <label htmlFor="timeRange" className="mr-2">Time Range:</label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          className="p-2 border rounded"
        >
          <option value="all">All Time</option>
          <option value="year">This Year</option>
          <option value="month">This Month</option>
          <option value="day">Today</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {timers.map(timer => (
          <div key={timer.id} className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">{timer.projectName}</h2>
            <p className="text-4xl font-bold">{formatTime(calculateTotalTime(timer))}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSummary;
