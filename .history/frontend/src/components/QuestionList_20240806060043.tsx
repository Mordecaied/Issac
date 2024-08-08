import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

const QuestionList: React.FC<{ timerId: number }> = ({ timerId }) => {
  const { questions, addQuestion, updateQuestion } = useAppContext();
  const [newQuestion, setNewQuestion] = useState('');

  const timerQuestions = questions.filter(q => q.timerId === timerId);

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== '') {
      addQuestion({
        id: Date.now(),
        timerId,
        text: newQuestion,
        answer: '',
        isAnswered: false
      });
      setNewQuestion('');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Questions</h3>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder="New Question"
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={handleAddQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add Question
      </button>
      <ul className="space-y-2">
        {timerQuestions.map(question => (
          <li key={question.id} className="flex items-center">
            <input
              type="checkbox"
              checked={question.isAnswered}
              onChange={() => updateQuestion({ ...question, isAnswered: !question.isAnswered })}
              className="mr-2"
            />
            <span className={question.isAnswered ? 'line-through' : ''}>{question.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;