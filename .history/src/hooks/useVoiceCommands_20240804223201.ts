// src/hooks/useVoiceCommands.ts

import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { speechRecognitionService } from '../services/speechRecognition';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { topics, addTopic, addQuestion } = useAppContext();

  const processCommand = useCallback((command: string) => {
    const addSubtopicRegex = /Isaac, add (\w+) to (\w+)/i;
    const addQuestionRegex = /Isaac, add question (.+) to (\w+)(?: subtopic (\w+))?/i;

    const subtopicMatch = command.match(addSubtopicRegex);
    const questionMatch = command.match(addQuestionRegex);

    if (subtopicMatch) {
      const subTopicName = subtopicMatch[1];
      const topicName = subtopicMatch[2];
      const topic = topics.find(t => t.name.toLowerCase() === topicName.toLowerCase());
      if (topic) {
        const updatedTopic = {
          ...topic,
          subTopics: [...topic.subTopics, { id: Date.now().toString(), name: subTopicName, questions: [] }]
        };
        addTopic(updatedTopic);
      }
    } else if (questionMatch) {
      const questionText = questionMatch[1];
      const topicName = questionMatch[2];
      const subTopicName = questionMatch[3];
      const topic = topics.find(t => t.name.toLowerCase() === topicName.toLowerCase());
      if (topic) {
        const newQuestion = {
          id: Date.now().toString(),
          text: questionText,
          answer: '',
          dateCreated: new Date().toISOString(),
          answeredBy: ''
        };
        if (subTopicName) {
          const subTopic = topic.subTopics.find(st => st.name.toLowerCase() === subTopicName.toLowerCase());
          if (subTopic) {
            addQuestion(topic.id, subTopic.id, newQuestion);
          }
        } else {
          addQuestion(topic.id, null, newQuestion);
        }
      }
    }
  }, [topics, addTopic, addQuestion]);

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
  }, [isListening, processCommand]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return { isListening, transcript, toggleListening };
};

export default useVoiceCommands;