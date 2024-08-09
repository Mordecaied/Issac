import React, { createContext, useContext, ReactNode, useState } from 'react';
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
  questions: Question[];
  issues: Issue[];
  addTimer: (timer: Timer) => void;
  updateTimer: (timer: Timer) => void;
  deleteTimer: (id: number) => void;
  addSubTimer: (parentId: number, subTimer: SubTimer) => void;
  updateSubTimer: (parentId: number, subTimer: SubTimer) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (question: Question) => void;
  deleteQuestion: (id: number) => void;
  addIssue: (issue: Issue) => void;
  updateIssue: (issue: Issue) => void;
  deleteIssue: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { timers, addTimer, updateTimer, deleteTimer, addSubTimer, updateSubTimer } = useTimers();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

  const addQuestion = (question: Question) => setQuestions((prev) => [...prev, question]);
  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions((prev) => prev.map((q) => q.id === updatedQuestion.id ? updatedQuestion : q));
  };
  const deleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const addIssue = (issue: Issue) => setIssues((prev) => [...prev, issue]);
  const updateIssue = (updatedIssue: Issue) => {
    setIssues((prev) => prev.map((i) => i.id === updatedIssue.id ? updatedIssue : i));
  };
  const deleteIssue = (id: number) => {
    setIssues((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <AppContext.Provider value={{
      timers, 
      questions, 
      issues,
      addTimer, 
      updateTimer, 
      deleteTimer,
      addSubTimer, 
      updateSubTimer,
      addQuestion, 
      updateQuestion,
      deleteQuestion,
      addIssue, 
      updateIssue,
      deleteIssue
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