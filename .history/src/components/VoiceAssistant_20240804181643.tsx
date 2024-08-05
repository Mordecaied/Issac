import React, { useState, useEffect } from 'react';
import { MicrophoneIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { useAppContext, Topic } from '../AppContext';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { addTopic, setActiveSession } = useAppContext();
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setTranscript(transcript);
        processCommand(transcript);
      };
      setRecognition(recognition);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const processCommand = (command: string) => {
    const addTopicRegex = /Isaac, add topic (\w+)(?: with subtopic (\w+))?/i;
    const match = command.match(addTopicRegex);

    if (match) {
      const topicName = match[1];
      const subTopicName = match[2];
      const newTopic: Topic = {
        id: Date.now().toString(),
        name: topicName,
        duration: 0,
        subTopics: subTopicName ? [{ id: `${Date.now()}-sub`, name: subTopicName }] : [],
      };
      addTopic(newTopic);
      setActiveSession(newTopic.id);
      speak(`Added new topic: ${topicName}${subTopicName ? ` with subtopic: ${subTopicName}` : ''}`);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <VolumeUpIcon className="h-6 w-6 mr-2 text-blue-500" />
        Isaac Voice Assistant
      </h2>
      <button
        onClick={toggleListening}
        className={`flex items-center justify-center w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
          isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        <MicrophoneIcon className="h-5 w-5 mr-2" />
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Say "Isaac, add topic [topic name] with subtopic [subtopic name]"
      </p>
      {isListening && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <p className="font-semibold">Live Transcription:</p>
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;