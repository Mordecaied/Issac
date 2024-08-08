import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Timer {
  id: number;
  projectName: string;
  time: number;
  isRunning: boolean;
}

interface Question {
  id: number;
  text: string;
  answer: string;
  isAnswered: boolean;
}

interface Issue {
  id: number;
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