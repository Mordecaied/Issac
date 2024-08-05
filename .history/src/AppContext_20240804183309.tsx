import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SubTopic {
  id: string;
  name: string;
}

export interface Topic {
  id: string;
  name: string;
  duration: number;
  subTopics: SubTopic[];
}

interface AppContextType {
  activeSession: string | null;
  setActiveSession: (session: string | null) => void;