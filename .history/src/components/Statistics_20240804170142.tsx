import React from 'react';
import { ChartBarIcon } from '@heroicons/react/solid';

const Statistics: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <ChartBarIcon className="h-6 w-6 mr-2 text-purple-500" />
        Statistics
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        Statistics and charts will be implemented here.
      </p>
    </div>
  );
};

export default Statistics;