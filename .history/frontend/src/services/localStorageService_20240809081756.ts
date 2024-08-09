// src/services/localStorageService.ts

import { Timer, Question, Issue } from '../context/AppContext';

const STORAGE_KEY = 'productivityAppData';

interface AppData {
  timers: Timer[];
  questions: Question[];
  issues: Issue[];
}

export const saveToLocalStorage = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadFromLocalStorage = (): AppData | null => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : null;
};