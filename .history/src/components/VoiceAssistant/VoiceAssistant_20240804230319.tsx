// src/components/VoiceAssistant/VoiceAssistant.tsx

import React, { useState, useEffect } from 'react';
import { MicrophoneIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { useAppContext, Topic, Question } from '../../contexts/AppContext';
import { speechRecognitionService } from '../../services/speechRecognition';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { updateTopic, topics, addQuestion } = useAppContext();

  useEffect(() => {
    if (isListening) {
      speechRecognitionService.start((newTranscript) => {
        setTranscript(newTranscript);
        processCommand(newTranscript);
      });
    } else {
      speechRecognitionService.stop();
    }
    return () => {
      speechRecognitionService.stop();
    };
  }, [isListening]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const processCommand = (command: string) => {
    const addSubtopicRegex = /Isaac, add (\w+) to (\w+)/i;
    const addQuestionRegex = /Isaac, add question (.+) to (\w+)(?: subtopic (\w+))?/i;

    const subtopicMatch = command.match(addSubtopicRegex);
    const questionMatch = command.match(addQuestionRegex);

    if (subtopicMatch) {
      const subTopicName = subtopicMatch[1];
      const topicName = subtopicMatch[2];
      addSubtopicToTopic(topicName, subTopicName);
    } else if (questionMatch) {
      const questionText = questionMatch[1];
      const topicName = questionMatch[2];
      const subTopicName = questionMatch[3];
      addQuestionToTopic(topicName, subTopicName, questionText);
    }
  };

  const addSubtopicToTopic = (topicName: string, subTopicName: string) => {
    const topic = topics.find((t) => t.name.toLowerCase() === topicName.toLowerCase());
    if (topic) {
      const updatedTopic: Topic = {
        ...topic,
        subTopics: [...topic.subTopics, { id: Date.now().toString(), name: subTopicName, questions: [] }],
      };
      updateTopic(updatedTopic);
      speak(`Added subtopic ${subTopicName} to topic ${topicName}`);
    } else {
      speak(`Topic ${topicName} not found`);
    }
  };

  const addQuestionToTopic = (topicName: string, subTopicName: string | undefined, questionText: string) => {
    const topic = topics.find((t) => t.name.toLowerCase() === topicName.toLowerCase());
    
    if (topic) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        subject: questionText.substring(0, 50), // Use first 50 characters as subject
        text: questionText,
        answer: '',
        dateCreated: new Date().toISOString(),
        answeredBy: '',
        status: 'open',
        priority: 'medium',
        tags: []
      };

      if (subTopicName) {
        const subTopic = topic.subTopics.find((st) => st.name.toLowerCase() === subTopicName.toLowerCase());
        if (subTopic) {
          addQuestion(topic.id, subTopic.id, newQuestion);
          speak(`Added question to subtopic ${subTopicName} in topic ${topicName}`);
        } else {
          speak(`Subtopic ${subTopicName} not found in topic ${topicName}`);
        }
      } else {
        addQuestion(topic.id, null, newQuestion);
        speak(`Added question to topic ${topicName}`);
      }
    } else {
      speak(`Topic ${topicName} not found`);
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
        Say "Isaac, add [subtopic] to [topic]" or "Isaac, add question [question] to [topic] subtopic [subtopic]"
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