import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import QuestionList from './QuestionList';
import IssueList from './IssueList';
import TimerCard from './TimerCard';

const Dashboard: React.FC = () => {
  const { timers } = useAppContext();
  const [expandedTimerId, setExpandedTimerId] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {timers.map(timer => (
        <div key={timer.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <TimerCard 
            timer={timer} 
            isExpanded={expandedTimerId === timer.id}
            onToggleExpand={() => setExpandedTimerId(expandedTimerId === timer.id ? null : timer.id)}
          />
          {expandedTimerId === timer.id && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-semibold mb-2">Questions</h3>
                  <QuestionList timerId={timer.id} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-semibold mb-2">Issues</h3>
                  <IssueList timerId={timer.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;