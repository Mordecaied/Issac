// src/services/timeTracking.ts

export interface TimeEntry {
    topicId: string;
    subTopicId?: string;
    startTime: number;
    endTime?: number;
  }
  
  export class TimeTrackingService {
    private timeEntries: TimeEntry[] = [];
  
    startSession(topicId: string, subTopicId?: string): void {
      this.timeEntries.push({
        topicId,
        subTopicId,
        startTime: Date.now(),
      });
    }
  
    stopSession(topicId: string, subTopicId?: string): void {
      const entry = this.timeEntries.find(
        (e) => e.topicId === topicId && e.subTopicId === subTopicId && !e.endTime
      );
      if (entry) {
        entry.endTime = Date.now();
      }
    }
  
    getSessionDuration(topicId: string, subTopicId?: string): number {
      return this.timeEntries
        .filter((e) => e.topicId === topicId && e.subTopicId === subTopicId && e.endTime)
        .reduce((total, entry) => total + (entry.endTime! - entry.startTime), 0);
    }
  
    getTotalDuration(topicId: string): number {
      return this.timeEntries
        .filter((e) => e.topicId === topicId && e.endTime)
        .reduce((total, entry) => total + (entry.endTime! - entry.startTime), 0);
    }
  }
  
  export const timeTrackingService = new TimeTrackingService();