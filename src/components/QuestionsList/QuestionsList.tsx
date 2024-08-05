// src/components/QuestionsList/QuestionsList.tsx

import React, { useState } from 'react';
import { useAppContext, Question } from '../../contexts/AppContext';

interface QuestionsListProps {
  topicId: string;
  subTopicId?: string;
}

const QuestionsList: React.FC<QuestionsListProps> = ({ topicId, subTopicId }) => {
  const { topics, updateQuestion } = useAppContext();
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const topic = topics.find((t) => t.id === topicId);
  const questions = subTopicId
    ? topic?.subTopics.find((st) => st.id === subTopicId)?.questions
    : topic?.questions;

  const handleUpdateQuestion = (questionId: string, updatedFields: Partial<Question>) => {
    const question = questions?.find((q) => q.id === questionId);
    if (question) {
      const updatedQuestion = { ...question, ...updatedFields };
      updateQuestion(topicId, subTopicId || null, questionId, updatedQuestion);
      setEditingQuestionId(null);
    }
  };

  if (!questions || questions.length === 0) {
    return <p>No questions available.</p>;
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div key={question.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">{question.subject}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Created on: {new Date(question.dateCreated).toLocaleDateString()}
          </p>
          <p className="mb-2">{question.text}</p>
          <div className="flex space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs ${
              question.status === 'open' ? 'bg-yellow-200 text-yellow-800' :
              question.status === 'answered' ? 'bg-green-200 text-green-800' :
              'bg-red-200 text-red-800'
            }`}>
              {question.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              question.priority === 'low' ? 'bg-blue-200 text-blue-800' :
              question.priority === 'medium' ? 'bg-orange-200 text-orange-800' :
              'bg-red-200 text-red-800'
            }`}>
              {question.priority}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 mb-2">
            {question.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-800">
                {tag}
              </span>
            ))}
          </div>
          {editingQuestionId === question.id ? (
            <div className="mt-2">
              <textarea
                className="w-full p-2 border rounded"
                value={question.answer}
                onChange={(e) => handleUpdateQuestion(question.id, { answer: e.target.value })}
              />
              <input
                type="text"
                className="w-full mt-2 p-2 border rounded"
                value={question.answeredBy}
                onChange={(e) => handleUpdateQuestion(question.id, { answeredBy: e.target.value })}
                placeholder="Answered by"
              />
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  handleUpdateQuestion(question.id, { 
                    status: 'answered',
                    dateAnswered: new Date().toISOString()
                  });
                  setEditingQuestionId(null);
                }}
              >
                Save Answer
              </button>
            </div>
          ) : (
            <div className="mt-2">
              {question.answer && (
                <>
                  <p className="font-semibold">Answer:</p>
                  <p>{question.answer}</p>
                </>
              )}
              {question.answeredBy && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Answered by: {question.answeredBy}
                </p>
              )}
              {question.dateAnswered && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Answered on: {new Date(question.dateAnswered).toLocaleDateString()}
                </p>
              )}
              <button
                className="mt-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
                onClick={() => setEditingQuestionId(question.id)}
              >
                {question.answer ? 'Edit Answer' : 'Add Answer'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;