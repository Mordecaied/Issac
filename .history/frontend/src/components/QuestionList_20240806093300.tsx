import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

const QuestionList: React.FC<{ timerId: number }> = ({ timerId }) => {
  const { questions, addQuestion, updateQuestion } = useAppContext();
  const [newQuestion, setNewQuestion] = useState('');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(null);

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

  const handleUpdateAnswer = (questionId: number, answer: string) => {
    const question = timerQuestions.find(q => q.id === questionId);
    if (question) {
      updateQuestion({ ...question, answer, isAnswered: true });
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
          <li key={question.id} className="border-b pb-2">
            <div
              className="cursor-pointer"
              onClick={() => setExpandedQuestionId(expandedQuestionId === question.id ? null : question.id)}
            >
              <span className={question.isAnswered ? 'font-semibold' : ''}>{question.text}</span>
              {question.isAnswered && <span className="ml-2 text-green-500">✓</span>}
            </div>
            {expandedQuestionId === question.id && (
              <div className="mt-2">
                <textarea
                  value={question.answer}
                  onChange={(e) => handleUpdateAnswer(question.id, e.target.value)}
                  placeholder="Enter answer"
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;