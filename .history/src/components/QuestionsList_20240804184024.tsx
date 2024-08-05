import React, { useState } from 'react';
import { useAppContext, Question } from '../AppContext';

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
          <h3 className="text-lg font-semibold mb-2">{question.text}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created on: {new Date(question.dateCreated).toLocaleDateString()}
          </p>
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
                onClick={() => setEditingQuestionId(null)}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="mt-2">
              <p>{question.answer || 'No answer yet.'}</p>
              {question.answeredBy && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Answered by: {question.answeredBy}
                </p>
              )}
              <button
                className="mt-2 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
                onClick={() => setEditingQuestionId(question.id)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;