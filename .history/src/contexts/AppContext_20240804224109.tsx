// src/contexts/AppContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { timeTrackingService } from '../services/timeTracking';

export interface Question {
  id: string;
  text: string;
  answer: string;
  dateCreated: string;
  answeredBy: string;
}

export interface SubTopic {
  id: string;
  name: string;
  questions: Question[];
}

export interface Topic {
    id: string;
    name: string;
    duration: number; // Add this line
    subTopics: SubTopic[];
    questions: Question[];
  }

interface AppContextType {
  activeSession: string | null;
  setActiveSession: (session: string | null) => void;
  topics: Topic[];
  addTopic: (topic: Topic) => void;
  updateTopic: (updatedTopic: Topic) => void;
  startSession: (topicId: string, subTopicId?: string) => void;
  stopSession: () => void;
  addQuestion: (topicId: string, subTopicId: string | null, question: Question) => void;
  updateQuestion: (topicId: string, subTopicId: string | null, questionId: string, updatedQuestion: Question) => void;
  getTopicDuration: (topicId: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);

  const addTopic = (topic: Topic) => {
    setTopics([...topics, topic]);
  };

  const updateTopic = (updatedTopic: Topic) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === updatedTopic.id ? updatedTopic : topic
      )
    );
  };

  const startSession = (topicId: string, subTopicId?: string) => {
    setActiveSession(subTopicId ? `${topicId}-${subTopicId}` : topicId);
    timeTrackingService.startSession(topicId, subTopicId);
  };

  const stopSession = () => {
    if (activeSession) {
      const [topicId, subTopicId] = activeSession.split('-');
      timeTrackingService.stopSession(topicId, subTopicId);
      setActiveSession(null);
    }
  };

  const addQuestion = (topicId: string, subTopicId: string | null, question: Question) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => {
        if (topic.id === topicId) {
          if (subTopicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map((subTopic) =>
                subTopic.id === subTopicId
                  ? { ...subTopic, questions: [...subTopic.questions, question] }
                  : subTopic
              ),
            };
          } else {
            return { ...topic, questions: [...topic.questions, question] };
          }
        }
        return topic;
      })
    );
  };

  const updateQuestion = (topicId: string, subTopicId: string | null, questionId: string, updatedQuestion: Question) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => {
        if (topic.id === topicId) {
          if (subTopicId) {
            return {
              ...topic,
              subTopics: topic.subTopics.map((subTopic) =>
                subTopic.id === subTopicId
                  ? {
                      ...subTopic,
                      questions: subTopic.questions.map((q) =>
                        q.id === questionId ? updatedQuestion : q
                      ),
                    }
                  : subTopic
              ),
            };
          } else {
            return {
              ...topic,
              questions: topic.questions.map((q) =>
                q.id === questionId ? updatedQuestion : q
              ),
            };
          }
        }
        return topic;
      })
    );
  };

  const getTopicDuration = (topicId: string) => {
    return timeTrackingService.getTotalDuration(topicId);
  };

  const value = {
    activeSession,
    setActiveSession,
    topics,
    addTopic,
    updateTopic,
    startSession,
    stopSession,
    addQuestion,
    updateQuestion,
    getTopicDuration,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;