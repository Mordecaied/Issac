// src/hooks/useVoiceCommands.ts

import { useState, useEffect, useCallback } from 'react';
import { useAppContext, Topic, Question } from '../contexts/AppContext';
import { speechRecognitionService } from '../services/speechRecognition';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { topics, addTopic, updateTopic, addQuestion } = useAppContext();

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
        const updatedTopic: Topic = {
          ...topic,
          subTopics: [...topic.subTopics, { id: Date.now().toString(), name: subTopicName, questions: [] }]
        };
        updateTopic(updatedTopic);
      }
    } else if (questionMatch) {
      const questionText = questionMatch[1];
      const topicName = questionMatch[2];
      const subTopicName = questionMatch[3];
      const topic = topics.find(t => t.name.toLowerCase() === topicName.toLowerCase());
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
          const subTopic = topic.subTopics.find(st => st.name.toLowerCase() === subTopicName.toLowerCase());
          if (subTopic) {
            addQuestion(topic.id, subTopic.id, newQuestion);
          }
        } else {
          addQuestion(topic.id, null, newQuestion);
        }
      }
    }
  }, [topics, addTopic, updateTopic, addQuestion]);

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