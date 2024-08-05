import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [sessionRunning, setSessionRunning] = useState(false);

  const addTopic = (topic) => {
    setTopics([...topics, topic]);
  };

  const updateTopic = (index, newTopic) => {
    const newTopics = [...topics];
    newTopics[index] = newTopic;
    setTopics(newTopics);
  };

  const updateTopicDuration = (index, duration) => {
    const newTopics = [...topics];
    if (newTopics[index]) {
      newTopics[index].duration = duration;
    }
    setTopics(newTopics);
  };

  const startSession = () => {
    setSessionRunning(true);
  };

  const stopSession = () => {
    setSessionRunning(false);
  };

  return (
    <AppContext.Provider value={{ addTopic, updateTopic, updateTopicDuration, startSession, stopSession, sessionRunning }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppProvider;
