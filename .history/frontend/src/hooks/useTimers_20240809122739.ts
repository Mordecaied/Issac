import { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, SubTimer } from '../context/AppContext';

export const useTimers = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateRunningTimers = () => {
      setTimers(prevTimers =>
        prevTimers.map(timer => {
          let totalSubTime = 0;
          const updatedSubTimers = timer.subTimers.map(subTimer => {
            if (subTimer.isRunning) {
              const newTime = subTimer.time + 1;
              totalSubTime += 1;
              return { ...subTimer, time: newTime, lastUpdated: new Date().toISOString() };
            }
            return subTimer;
          });

          const newTime = timer.isRunning ? timer.time + 1 : timer.time;
          return {
            ...timer,
            time: newTime + totalSubTime,
            subTimers: updatedSubTimers,
            lastUpdated: timer.isRunning || totalSubTime > 0 ? new Date().toISOString() : timer.lastUpdated
          };
        })
      );
    };

    timerIntervalRef.current = setInterval(updateRunningTimers, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const addTimer = useCallback((timer: Timer) => setTimers(prev => [...prev, { ...timer, lastUpdated: new Date().toISOString() }]), []);

  const updateTimer = useCallback((updatedTimer: Timer) => {
    setTimers(prev => prev.map(timer => 
      timer.id === updatedTimer.id 
        ? { ...updatedTimer, lastUpdated: new Date().toISOString() } 
        : timer
    ));
  }, []);

  const deleteTimer = useCallback((id: number) => {
    setTimers(prev => prev.filter(timer => timer.id !== id));
  }, []);

  const addSubTimer = useCallback((parentId: number, subTimer: SubTimer) => {
    setTimers(prev => prev.map(timer => 
      timer.id === parentId 
        ? { ...timer, subTimers: [...timer.subTimers, { ...subTimer, lastUpdated: new Date().toISOString() }] }
        : timer
    ));
  }, []);

  const updateSubTimer = useCallback((parentId: number, updatedSubTimer: SubTimer) => {
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
  }, []);

  const resetTimers = useCallback(() => {
    setTimers([]);
  }, []);

  return { timers, addTimer, updateTimer, deleteTimer, addSubTimer, updateSubTimer, resetTimers };
};