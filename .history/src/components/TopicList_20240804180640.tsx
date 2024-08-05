import React, { useState } from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';
import { Disclosure } from '@headlessui/react';
import { useAppContext, Topic, SubTopic } from '../AppContext';

const TopicList: React.FC = () => {
  const { topics, setActiveSession, addTopic } = useAppContext();
  const [newTopicName, setNewTopicName] = useState('');

  const handleAddNewTopic = () => {
    if (newTopicName.trim()) {
      const newTopic: Topic = {
        id: Date.now().toString(),
        name: newTopicName.trim(),
        duration: 0,
        subTopics: [],
      };
      addTopic(newTopic);
      setNewTopicName('');
    }
  };

  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <Disclosure key={topic.id}>
          {({ open }) => (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>{topic.name}</span>
                <ChevronDownIcon
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-blue-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 dark:text-gray-300">
                {topic.subTopics.map((subTopic: SubTopic) => (
                  <div
                    key={subTopic.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{subTopic.name}</span>
                    <button
                      onClick={() => setActiveSession(`${topic.name} - ${subTopic.name}`)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md text-sm transition-colors"
                    >
                      Start
                    </button>
                  </div>
                ))}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
          placeholder="New topic name"
          className="flex-grow px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleAddNewTopic}
          className="flex items-center justify-center py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Topic
        </button>
      </div>
    </div>
  );
};

export default TopicList;