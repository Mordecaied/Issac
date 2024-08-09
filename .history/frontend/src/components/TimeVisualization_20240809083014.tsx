import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';

interface ChartData {
  name: string;
  mainTime: number;
  subTime: number;
}

const TimeVisualization: React.FC = () => {
  const { timers } = useAppContext();

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const data: ChartData[] = timers.map(timer => ({
    name: timer.projectName,
    mainTime: timer.time,
    subTime: timer.subTimers.reduce((acc, subTimer) => acc + subTimer.time, 0),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{`Project: ${label}`}</p>
          <p>{`Main Timer: ${formatTime(payload[0].value)}`}</p>
          <p>{`Sub-timers: ${formatTime(payload[1].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value: number) => formatTime(value)} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="mainTime" fill="#8884d8" name="Main Timer" />
          <Bar dataKey="subTime" fill="#82ca9d" name="Sub-timers" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeVisualization;