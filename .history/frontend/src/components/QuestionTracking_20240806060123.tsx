import React, { useState } from 'react';
import { useAppContext } from '../AppContext';
import QuestionList from './QuestionList';

const QuestionTracking: React.FC = () => {
  const { timers } = useAppContext();

  return (
    <div className="space-y-4">
      {timers.map(timer => (
        <div key={timer.id} className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{timer.projectName}</h2>
          <QuestionList timerId={timer.id} />
        </div>
      ))}
    </div>
  );
};

export default QuestionTracking;