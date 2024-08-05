// src/services/commandProcessor.ts

import { Topic, Question, SubTopic } from '../contexts/AppContext';

export class CommandProcessorService {
  private addSubtopicRegex = /Isaac, add (\w+) to (\w+)/i;
  private addQuestionRegex = /Isaac, add question (.+) to (\w+)(?: subtopic (\w+))?/i;

  public processCommand(command: string, topics: Topic[], addSubtopic: (topicName: string, subTopicName: string) => void, addQuestion: (topicName: string, subTopicName: string | undefined, questionText: string) => void) {
    const subtopicMatch = command.match(this.addSubtopicRegex);
    const questionMatch = command.match(this.addQuestionRegex);

    if (subtopicMatch) {
      const subTopicName = subtopicMatch[1];
      const topicName = subtopicMatch[2];
      addSubtopic(topicName, subTopicName);
    } else if (questionMatch) {
      const questionText = questionMatch[1];
      const topicName = questionMatch[2];
      const subTopicName = questionMatch[3];
      addQuestion(topicName, subTopicName, questionText);
    }
  }
}

export const commandProcessorService = new CommandProcessorService();