import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

const QuestionTracking: React.FC = () => {
  const { questions, addQuestion, updateQuestion } = useAppContext();
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== '') {
      addQuestion({ 
        id: Date.now(), 
        text: newQuestion, 
        answer: '',
        isAnswered: false
      });
      setNewQuestion('');
    }
  };

  const handleUpdateAnswer = (id: number, answer: string) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      updateQuestion({ ...question, answer, isAnswered: answer.trim() !== '' });
    }
  };

  const handleToggleAnswered = (id: number) => {
    const question = questions.find(q => q.id === id);
    if (question) {
      updateQuestion({ ...question, isAnswered: !question.isAnswered });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Question Tracking</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter a new question"
          className="w-full p-2 mb-2 border rounded"
        />
        <button 
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Question
        </button>
      </div>
      <ul className="space-y-4">
        {questions.map((q) => (
          <li key={q.id} className="border-b pb-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={q.isAnswered}
                onChange={() => handleToggleAnswered(q.id)}
                className="mr-2"
              />
              <p className={`font-semibold ${q.isAnswered ? 'line-through' : ''}`}>{q.text}</p>
            </div>
            <input
              type="text"
              value={q.answer}
              onChange={(e) => handleUpdateAnswer(q.id, e.target.value)}
              placeholder="Enter answer"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={() => handleUpdateAnswer(q.id, q.answer)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Answer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionTracking;