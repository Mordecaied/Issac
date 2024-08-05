Terminate batch job (Y/N)? y
PS D:\App_Projects\isaac> npm start





















Compiled successfully!

You can now view isaac in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.0.0.125:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
Files successfully emitted, waiting for typecheck results...
Issues checking in progress...
ERROR in src/components/TopicList.tsx:4:25
TS2459: Module '"../AppContext"' declares 'Topic' locally, but it is not exported.
    2 | import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';
    3 | import { Disclosure } from '@headlessui/react';
  > 4 | import { useAppContext, Topic, SubTopic } from '../AppContext';
      |                         ^^^^^
    5 |
    6 | const TopicList: React.FC = () => {
    7 |   const { topics, setActiveSession, addTopic } = useAppContext();

ERROR in src/components/TopicList.tsx:4:32
TS2305: Module '"../AppContext"' has no exported member 'SubTopic'.
    2 | import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid';
    3 | import { Disclosure } from '@headlessui/react';
  > 4 | import { useAppContext, Topic, SubTopic } from '../AppContext';
      |                                ^^^^^^^^
    5 |
    6 | const TopicList: React.FC = () => {
    7 |   const { topics, setActiveSession, addTopic } = useAppContext();

ERROR in src/components/TopicList.tsx:38:24
TS2339: Property 'subTopics' does not exist on type 'Topic'.
    36 |               </Disclosure.Button>
    37 |               <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 dark:text-gray-300">
  > 38 |                 {topic.subTopics.map((subTopic: SubTopic) => (
       |                        ^^^^^^^^^
    39 |                   <div
    40 |                     key={subTopic.id}
    41 |                     className="flex justify-between items-center mb-2"

ERROR in src/components/VoiceAssistant.tsx:3:25
TS2459: Module '"../AppContext"' declares 'Topic' locally, but it is not exported.
    1 | import React, { useState } from 'react';
    2 | import { MicrophoneIcon, VolumeUpIcon } from '@heroicons/react/solid';
  > 3 | import { useAppContext, Topic } from '../AppContext';
      |                         ^^^^^
    4 |
    5 | const VoiceAssistant: React.FC = () => {
    6 |   const [isListening, setIsListening] = useState(false);
