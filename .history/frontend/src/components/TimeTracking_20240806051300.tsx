import React, { useState, useEffect } from 'react';

interface Timer {
  id: number;
  projectName: string;
  time: number;
  isRunning: boolean;
}

interface Question {
  id: number;
  text: string;
  answer: string;
}

interface Issue {
  id: number;
  text: string;
  status: 'open' | 'in progress' | 'resolved';
}

const TimeTracker: React.FC = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [newTimerName, setNewTimerName] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
      setTimers([...timers, { id: Date.now(), projectName: newTimerName, time: 0, isRunning: false }]);
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

  const handleAddQuestion = (timerId: number) => {
    if (newQuestion.trim() !== '') {
      setQuestions([...questions, { id: Date.now(), text: newQuestion, answer: '' }]);
      setNewQuestion('');
    }
  };

  const handleAddIssue = (timerId: number) => {
    if (newIssue.trim() !== '') {
      setIssues([...issues, { id: Date.now(), text: newIssue, status: 'open' }]);
      setNewIssue('');
    }
  };

  const handleExpandCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
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
              onClick={() => handleExpandCard(timer.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150"
            >
              {expandedCard === timer.id ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {expandedCard === timer.id && (
            <div>
              <h3 className="font-semibold mb-2">Questions</h3>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="New Question"
                className="p-2 border rounded mr-2"
              />
              <button
                onClick={() => handleAddQuestion(timer.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150"
              >
                Add Question
              </button>
              <ul className="mt-2">
                {questions.map(question => (
                  <li key={question.id} className="bg-gray-100 p-2 rounded mb-2">{question.text}</li>
                ))}
              </ul>
              <h3 className="font-semibold mb-2 mt-4">Issues</h3>
              <input
                type="text"
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
                placeholder="New Issue"
                className="p-2 border rounded mr-2"
              />
              <button
                onClick={() => handleAddIssue(timer.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition duration-150"
              >
                Add Issue
              </button>
              <ul className="mt-2">
                {issues.map(issue => (
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