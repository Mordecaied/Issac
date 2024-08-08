import React, { useState, useEffect } from 'react';

interface Timer {
  id: number;
  projectName: string;
  time: number;
  isRunning: boolean;
  questions: Question[];
  issues: Issue[];
}

interface Question {
  id: number;
  text: string;
}

interface Issue {
  id: number;
  text: string;
  status: 'open' | 'in progress' | 'resolved';
}

const TimeTracker: React.FC = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [newTimerName, setNewTimerName] = useState('');
  const [expandedTimer, setExpandedTimer] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(timer =>
          timer.isRunning ? { ...timer, time: timer.time + 1 } : timer
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
  };

  const handleCreateTimer = () => {
    if (newTimerName.trim() !== '') {
      setTimers([...timers, { 
        id: Date.now(), 
        projectName: newTimerName, 
        time: 0, 
        isRunning: false,
        questions: [],
        issues: []
      }]);
      setNewTimerName('');
    }
  };

  const handleDeleteTimer = (id: number) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  const handleToggleTimer = (id: number) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer
    ));
  };

  const handleAddQuestion = (timerId: number, questionText: string) => {
    setTimers(timers.map(timer =>
      timer.id === timerId
        ? { ...timer, questions: [...timer.questions, { id: Date.now(), text: questionText }] }
        : timer
    ));
  };

  const handleAddIssue = (timerId: number, issueText: string) => {
    setTimers(timers.map(timer =>
      timer.id === timerId
        ? { ...timer, issues: [...timer.issues, { id: Date.now(), text: issueText, status: 'open' }] }
        : timer
    ));
  };

  const handleExpandTimer = (id: number) => {
    setExpandedTimer(expandedTimer === id ? null : id);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <input
          type="text"
          value={newTimerName}
          onChange={(e) => setNewTimerName(e.target.value)}
          placeholder="New Timer Name"
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleCreateTimer}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150"
        >
          Create Timer
        </button>
      </div>
      {timers.map(timer => (
        <div key={timer.id} className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{timer.projectName}</h2>
            <div className="text-3xl font-bold">{formatTime(timer.time)}</div>
          </div>
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => handleToggleTimer(timer.id)}
              className={`px-4 py-2 rounded text-white transition duration-150 ${
                timer.isRunning
                  ? 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                  : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
              }`}
            >
              {timer.isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => handleDeleteTimer(timer.id)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 active:bg-gray-700 transition duration-150"
            >
              Delete
            </button>
            <button
              onClick={() => handleExpandTimer(timer.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150"
            >
              {expandedTimer === timer.id ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {expandedTimer === timer.id && (
            <div>
              <h3 className="font-semibold mb-2">Questions</h3>
              <input
                type="text"
                placeholder="New Question"
                className="p-2 border rounded mr-2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddQuestion(timer.id, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <ul className="mt-2">
                {timer.questions.map(question => (
                  <li key={question.id} className="bg-gray-100 p-2 rounded mb-2">{question.text}</li>
                ))}
              </ul>
              <h3 className="font-semibold mb-2 mt-4">Issues</h3>
              <input
                type="text"
                placeholder="New Issue"
                className="p-2 border rounded mr-2"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddIssue(timer.id, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <ul className="mt-2">
                {timer.issues.map(issue => (
                  <li key={issue.id} className="bg-gray-100 p-2 rounded mb-2">{issue.text} - {issue.status}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimeTracker;