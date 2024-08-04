import React, { useState } from 'react';
import { MicrophoneIcon, VolumeUpIcon } from '@heroicons/react/solid';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleListening = () => {
    setIsListening(!isListening);
    // Implement actual voice recognition logic here
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
        Say "Isaac, add question to [topic]: [your question]"
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