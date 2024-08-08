import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface SubTimer {
  id: number;
  name: string;
  time: number;
  isRunning: boolean;
  lastUpdated: string; // Add this line
}

export interface Timer {
  id: number;
  projectName: string;
  time: number;
  isRunning: boolean;
  subTimers: SubTimer[];
  lastUpdated: string; // Add this line
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
  addIssue: (issue: Issue) => void;
  updateIssue: (issue: Issue) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

  const addTimer = (timer: Timer) => setTimers([...timers, timer]);
  const updateTimer = (updatedTimer: Timer) => {
    setTimers(timers.map(timer => timer.id === updatedTimer.id ? updatedTimer : timer));
  };
  const deleteTimer = (id: number) => setTimers(timers.filter(timer => timer.id !== id));

  const addSubTimer = (parentId: number, subTimer: SubTimer) => {
    setTimers(timers.map(timer => 
      timer.id === parentId 
        ? { ...timer, subTimers: [...timer.subTimers, subTimer] }
        : timer
    ));
  };

  const updateSubTimer = (parentId: number, updatedSubTimer: SubTimer) => {
    setTimers(timers.map(timer => 
      timer.id === parentId 
        ? { ...timer, subTimers: timer.subTimers.map(sub => sub.id === updatedSubTimer.id ? updatedSubTimer : sub) }
        : timer
    ));
  };

  const addQuestion = (question: Question) => setQuestions([...questions, question]);
  const updateQuestion = (updatedQuestion: Question) => {
    setQuestions(questions.map(question => question.id === updatedQuestion.id ? updatedQuestion : question));
  };

  const addIssue = (issue: Issue) => setIssues([...issues, issue]);
  const updateIssue = (updatedIssue: Issue) => {
    setIssues(issues.map(issue => issue.id === updatedIssue.id ? updatedIssue : issue));
  };

  return (
    <AppContext.Provider value={{
      timers, questions, issues,
      addTimer, updateTimer, deleteTimer,
      addSubTimer, updateSubTimer,
      addQuestion, updateQuestion,
      addIssue, updateIssue
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