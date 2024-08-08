import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  answer: string;
}

const QuestionTracking: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== '') {
      setQuestions([...questions, { id: Date.now(), text: newQuestion, answer: '' }]);
      setNewQuestion('');
    }
  };

  const handleAnswerQuestion = (id: number, answer: string) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, answer } : q));
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
            <p className="font-semibold mb-2">{q.text}</p>
            <input
              type="text"
              value={q.answer}
              onChange={(e) => handleAnswerQuestion(q.id, e.target.value)}
              placeholder="Enter answer"
              className="w-full p-2 border rounded"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionTracking;