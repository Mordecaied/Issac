import React from 'react';
import { ChartBarIcon } from '@heroicons/react/solid';
import { useAppContext } from '../../contexts/AppContext';

const Statistics: React.FC = () => {
  const { topics, getTopicDuration } = useAppContext();

  const totalTime = topics.reduce((acc, topic) => acc + getTopicDuration(topic.id), 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <ChartBarIcon className="h-6 w-6 mr-2 text-purple-500" />
        Statistics
      </h2>
      <div className="space-y-4">
        <p className="text-lg">Total time tracked: {Math.round(totalTime / 60000)} minutes</p>
        <h3 className="text-xl font-semibold">Time per topic:</h3>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li key={topic.id} className="flex justify-between">
              <span>{topic.name}</span>
              <span>{Math.round(getTopicDuration(topic.id) / 60000)} minutes</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;