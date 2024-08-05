// src/hooks/useTimeTracking.ts

import { useState, useEffect } from 'react';
import { timeTrackingService } from '../services/timeTracking';

export function useTimeTracking(topicId: string, subTopicId?: string) {
  const [isTracking, setIsTracking] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        const newDuration = timeTrackingService.getSessionDuration(topicId, subTopicId);
        setDuration(newDuration);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, topicId, subTopicId]);

  const startTracking = () => {
    timeTrackingService.startSession(topicId, subTopicId);
    setIsTracking(true);
  };

  const stopTracking = () => {
    timeTrackingService.stopSession(topicId, subTopicId);
    setIsTracking(false);
  };

  return { isTracking, duration, startTracking, stopTracking };
}