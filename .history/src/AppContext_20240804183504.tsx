import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SubTopic {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  duration: number;
  subTopics: SubTopic[];
}

interface AppContextType {
  activeSession: string | null;
  setActiveSession: (session: string | null) => void;
  topics: Topic[];
  addTopic: (topic: Topic) => void;
  updateTopic: (updatedTopic: Topic) => void;
  updateTopicDuration: (id: string, duration: number) => void;
  startSession: () => void;
  stopSession: () => void;
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
  const [isSessionRunning, setIsSessionRunning] = useState(false);

  const addTopic = (topic: Topic) => {
    setTopics((prevTopics) => [...prevTopics, { ...topic, duration: topic.duration || 0 }]);
  };

  const updateTopic = (updatedTopic: Topic) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => (topic.id === updatedTopic.id ? updatedTopic : topic))
    );
  };

  const updateTopicDuration = (id: string, duration: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => {
        if (topic.id === id) {
          return { ...topic, duration };
        }
        const updatedSubTopics = topic.subTopics.map((subTopic) => {
          if (`${topic.id}-${subTopic.id}` === id) {
            return { ...subTopic, duration };
          }
          return subTopic;
        });
        return { ...topic, subTopics: updatedSubTopics };
      })
    );
  };

  const startSession = () => {
    setIsSessionRunning(true);
  };

  const stopSession = () => {
    setIsSessionRunning(false);
    setActiveSession(null);
  };

  const value = {
    activeSession,
    setActiveSession,
    topics,
    addTopic,
    updateTopic,
    updateTopicDuration,
    startSession,
    stopSession,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;