import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';

const TimeVisualization: React.FC = () => {
  const { timers } = useAppContext();

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const data = timers.map(timer => ({
    name: timer.projectName,
    mainTime: timer.time,
    subTime: timer.subTimers.reduce((acc, subTimer) => acc + subTimer.time, 0),
  }));

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => formatTime(value as number)} />
          <Tooltip 
            formatter={(value: number) => formatTime(value)}
            labelFormatter={(label) => `Project: ${label}`}
          />
          <Legend />
          <Bar dataKey="mainTime" fill="#8884d8" name="Main Timer" />
          <Bar dataKey="subTime" fill="#82ca9d" name="Sub-timers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeVisualization;