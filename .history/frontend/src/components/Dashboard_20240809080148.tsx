import React, { useState } from 'react';
import TimeTracking from './TimeTracking';
import QuestionTracking from './QuestionTracking';
import IssueTracking from './IssueTracking';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'time':
        return <TimeTracking />;
      case 'questions':
        return <QuestionTracking />;
      case 'issues':
        return <IssueTracking />;
      default:
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Welcome to Your Productivity Assistant</h2>
            <p>Select a view to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gray-100 p-4">
        <h1 className="text-xl font-bold mb-4">Productivity Assistant</h1>
        <div className="space-y-2">
          <Button 
            onClick={() => setActiveView('dashboard')}
            variant={activeView === 'dashboard' ? 'default' : 'outline'}
            className="w-full"
          >
            Dashboard
          </Button>
          <Button 
            onClick={() => setActiveView('time')}
            variant={activeView === 'time' ? 'default' : 'outline'}
            className="w-full"
          >
            Time Tracking
          </Button>
          <Button 
            onClick={() => setActiveView('questions')}
            variant={activeView === 'questions' ? 'default' : 'outline'}
            className="w-full"
          >
            Questions
          </Button>
          <Button 
            onClick={() => setActiveView('issues')}
            variant={activeView === 'issues' ? 'default' : 'outline'}
            className="w-full"
          >
            Issues
          </Button>
        </div>
      </nav>
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default Dashboard;