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
    <div>
      <h2>Question Tracking</h2>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="Enter a new question"
      />
      <button onClick={handleAddQuestion}>Add Question</button>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <p>{q.text}</p>
            <input
              type="text"
              value={q.answer}
              onChange={(e) => handleAnswerQuestion(q.id, e.target.value)}
              placeholder="Enter answer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionTracking;
