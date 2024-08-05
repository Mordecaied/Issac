import React, { useEffect, useState } from 'react';
import { ClockIcon, PlayIcon, StopIcon } from '@heroicons/react/solid';
import { useAppContext } from '../AppContext';

const CurrentSession: React.FC = () => {
  const { activeSession, topics, updateTopicDuration, setActiveSession } = useAppContext();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && activeSession) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
        updateTopicDuration(activeSession, elapsedTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, activeSession, elapsedTime, updateTopicDuration]);

  useEffect(() => {
    // Reset elapsed time when active session changes
    setElapsedTime(0);
    setIsRunning(false);
  }, [activeSession]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const getActiveSessionName = () => {
    if (!activeSession) return null;
    const [topicId, subTopicId] = activeSession.split('-');
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) return null;
    if (subTopicId) {
      const subTopic = topic.subTopics.find((st) => st.id === subTopicId);
      return subTopic ? `${topic.name} - ${subTopic.name}` : null;
    }
    return topic.name;
  };

  const activeName = getActiveSessionName();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <ClockIcon className="h-6 w-6 mr-2 text-green-500" />
        Current Session
      </h2>
      {activeName ? (
        <div>
          <p className="text-lg font-medium">{activeName}</p>
          <p className="text-3xl font-bold mt-2">{formatTime(elapsedTime)}</p>
          <button
            onClick={handleStartStop}
            className={`mt-4 flex items-center justify-center px-4 py-2 rounded-md text-white font-medium transition-colors ${
              isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRunning ? (
              <>
                <StopIcon className="h-5 w-5 mr-2" />
                Stop
              </>
            ) : (
              <>
                <PlayIcon className="h-5 w-5 mr-2" />
                Start
              </>
            )}
          </button>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No active session</p>
      )}
    </div>
  );
};

export default CurrentSession;