import React, { useState } from 'react';
import VoiceAssistant from './VoiceAssistant';
import TopicList from './TopicList';
import CurrentSession from './CurrentSession';
import Statistics from './Statistics';
import { Tab } from '@headlessui/react';

const Dashboard: React.FC = () => {
  const [activeSession, setActiveSession] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 border-b pb-2">Isaac Time Tracker</h1>
      
      <VoiceAssistant />
      
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
          <Tab className={({ selected }) =>
            w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
             
          }>
            Time Tracker
          </Tab>
          <Tab className={({ selected }) =>
            w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
             
          }>
            Statistics
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CurrentSession activeSession={activeSession} />
            <TopicList setActiveSession={setActiveSession} />
          </Tab.Panel>
          <Tab.Panel>
            <Statistics />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Dashboard;
