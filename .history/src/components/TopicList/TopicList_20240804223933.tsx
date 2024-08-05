// src/utils/statisticsCalculator.ts

import { Topic } from '../contexts/AppContext';

export const calculateTotalTime = (topics: Topic[]): number => {
  return topics.reduce((total, topic) => total + topic.duration, 0);
};

export const calculateAverageTimePerTopic = (topics: Topic[]): number => {
  const totalTime = calculateTotalTime(topics);
  return topics.length > 0 ? totalTime / topics.length : 0;
};

export const findMostFrequentTopic = (topics: Topic[]): Topic | null => {
  if (topics.length === 0) return null;
  return topics.reduce((prev, current) => 
    (prev.duration > current.duration) ? prev : current
  );
};

export const calculateTotalQuestions = (topics: Topic[]): number => {
  return topics.reduce((total, topic) => 
    total + topic.questions.length + topic.subTopics.reduce((subTotal, subTopic) => 
      subTotal + subTopic.questions.length, 0
    ), 0
  );
};

const statisticsCalculator = {
  calculateTotalTime,
  calculateAverageTimePerTopic,
  findMostFrequentTopic,
  calculateTotalQuestions,
};

export default statisticsCalculator;