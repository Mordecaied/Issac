import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SubTopic {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  duration?: number;
  subTopics: SubTopic[];
}

interface AppContextType {
  activeSession: string | null;
  setActiveSession: (session: string | null) => void;
  topics: Topic[];
  addTopic: (topic: Topic) => void;
  updateTopicDuration: (id: string, duration: number) => void;
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
    setTopics((prevTopics) => [...prevTopics, { ...topic, duration: 0 }]);
  };

  const updateTopicDuration = (id: string, duration: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === id ? { ...topic, duration } : topic
      )
    );
  };

  const value = {
    activeSession,
    setActiveSession,
    topics,
    addTopic,
    updateTopicDuration,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};