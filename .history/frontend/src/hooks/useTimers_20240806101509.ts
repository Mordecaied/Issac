import { useState, useEffect, useRef } from 'react';
import { Timer, SubTimer } from '../context/AppContext';

export const useTimers = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateRunningTimers = () => {
      setTimers(prevTimers =>
        prevTimers.map(timer => ({
          ...timer,
          time: timer.isRunning ? timer.time + 1 : timer.time,
          subTimers: timer.subTimers.map(subTimer => ({
            ...subTimer,
            time: subTimer.isRunning ? subTimer.time + 1 : subTimer.time,
          })),
          lastUpdated: timer.isRunning ? new Date().toISOString() : timer.lastUpdated,
        }))
      );
    };

    timerIntervalRef.current = setInterval(updateRunningTimers, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const addTimer = (timer: Timer) => setTimers(prev => [...prev, { ...timer, lastUpdated: new Date().toISOString() }]);

  const updateTimer = (updatedTimer: Timer) => {
    setTimers(prev => prev.map(timer => 
      timer.id === updatedTimer.id 
        ? { ...updatedTimer, lastUpdated: new Date().toISOString() } 
        : timer
    ));
  };

  const deleteTimer = (id: number) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  const addSubTimer = (parentId: number, subTimer: SubTimer) => {
    setTimers(prev => prev.map(timer => 
      timer.id === parentId 
        ? { ...timer, subTimers: [...timer.subTimers, { ...subTimer, lastUpdated: new Date().toISOString() }] }
        : timer
    ));
  };

  const updateSubTimer = (parentId: number, updatedSubTimer: SubTimer) => {
    setTimers(prev => prev.map(timer => 
      timer.id === parentId 
        ? { 
            ...timer, 
            subTimers: timer.subTimers.map(sub => 
              sub.id === updatedSubTimer.id 
                ? { ...updatedSubTimer, lastUpdated: new Date().toISOString() } 
                : sub
            )
          }
        : timer
    ));
  };

  return { timers, addTimer, updateTimer, deleteTimer, addSubTimer, updateSubTimer };
};