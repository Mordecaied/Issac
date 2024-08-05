// src/components/CurrentSession/CurrentSession.tsx

import React, { useEffect } from 'react';
import { ClockIcon, StopIcon } from '@heroicons/react/solid';
import { useAppContext } from '../../contexts/AppContext';
import { useTimeTracking } from '../../hooks/useTimeTracking';

const CurrentSession: React.FC = () => {
  const { activeSession, topics, stopSession } = useAppContext();
  const [topicId, subTopicId] = activeSession ? activeSession.split('-') : [null, null];
  const { isTracking, duration, startTracking, stopTracking } = useTimeTracking(topicId!, subTopicId);

  useEffect(() => {
    if (activeSession && !isTracking) {
      startTracking();
    }
  }, [activeSession, isTracking, startTracking]);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStop = () => {
    stopTracking();
    stopSession();
  };

  const getActiveSessionName = () => {
    if (!topicId) return null;
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
          <p className="text-3xl font-bold mt-2">{formatTime(duration)}</p>
          <button
            onClick={handleStop}
            className="mt-4 flex items-center justify-center px-4 py-2 rounded-md text-white font-medium transition-colors bg-red-500 hover:bg-red-600"
          >
            <StopIcon className="h-5 w-5 mr-2" />
            Stop
          </button>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No active session</p>
      )}
    </div>
  );
};

export default CurrentSession;