import React, { useEffect } from 'react';
import { useAppContext } from './AppContext';

const VoiceAssistant = () => {
  const { addTopic, updateTopic, updateTopicDuration, startSession, stopSession, sessionRunning } = useAppContext();

  useEffect(() => {
    // Example usage
    addTopic('New Topic');
    updateTopic(0, 'Updated Topic');
    updateTopicDuration(0, 60);
    startSession();

    return () => {
      stopSession();
    };
  }, [addTopic, updateTopic, updateTopicDuration, startSession, stopSession]);

  return <div>Voice Assistant is {sessionRunning ? 'running' : 'stopped'}</div>;
};

export default VoiceAssistant;
