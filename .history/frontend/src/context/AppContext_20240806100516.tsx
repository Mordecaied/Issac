import React, { createContext, useContext, ReactNode } from 'react';
import { useTimers } from '../hooks/useTimers';

export interface SubTimer {
  id: number;
  name: string;
  time: number;
  isRunning: boolean;
  lastUpdated: string;
}

export interface Timer {
  id: number;
  projectName: string;
  time: number;
  isRunning: boolean;
  subTimers: SubTimer[];
  lastUpdated: string;
}

export interface Question {
  id: number;
  timerId: number;
  text: string;
  answer: string;
  isAnswered: boolean;
}

export interface Issue {
  id: number;
  timerId: number;
  text: string;
  status: 'open' | 'in progress' | 'resolved';
}

interface AppContextType {
  timers: Timer[];
  addTimer: (timer: Timer) => void;
  updateTimer: (timer: Timer) => void;
  deleteTimer: (id: number) => void;
  addSubTimer: (parentId: number, subTimer: SubTimer) => void;
  updateSubTimer: (parentId: number, subTimer: SubTimer) => void;
  // Add other context properties and methods here
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { timers, addTimer, updateTimer, deleteTimer, addSubTimer, updateSubTimer } = useTimers();

  // Add other hooks or state management here

  return (
    <AppContext.Provider value={{
      timers, addTimer, updateTimer, deleteTimer, addSubTimer, updateSubTimer,
      // Add other context values here
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};