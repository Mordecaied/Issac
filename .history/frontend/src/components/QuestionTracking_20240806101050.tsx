import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import QuestionList from './QuestionList';

const QuestionTracking: React.FC = () => {
  const { timers, addQuestion } = useAppContext();
  const [selectedTimerId, setSelectedTimerId] = useState<string>('');
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== '' && selectedTimerId !== '') {
      addQuestion({
        id: Date.now(),
        timerId: parseInt(selectedTimerId, 10),
        text: newQuestion,
        answer: '',
        isAnswered: false
      });
      setNewQuestion('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <select
          value={selectedTimerId}
          onChange={(e) => setSelectedTimerId(e.target.value)}
          className="p-2 border rounded mr-2"
        >
          <option value="">Select a timer</option>
          {timers.map(timer => (
            <option key={timer.id} value={timer.id.toString()}>{timer.projectName}</option>
          ))}
        </select>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="New Question"
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={!selectedTimerId || newQuestion.trim() === ''}
        >
          Add Question
        </button>
      </div>
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
