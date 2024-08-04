import React from 'react';
import { ClockIcon } from '@heroicons/react/solid';

interface CurrentSessionProps {
  activeSession: string | null;
}

const CurrentSession: React.FC<CurrentSessionProps> = ({ activeSession }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <ClockIcon className="h-6 w-6 mr-2 text-green-500" />
        Current Session
      </h2>
      {activeSession ? (
        <div>
          <p className="text-lg font-medium">{activeSession}</p>
          <p className="text-3xl font-bold mt-2">00:00:00</p>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No active session</p>
      )}
    </div>
  );
};

export default CurrentSession;