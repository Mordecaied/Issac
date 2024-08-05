// src/services/timeTracking.ts

interface TimeEntry {
  topicId: string;
  subTopicId?: string;
  startTime: number;
  endTime?: number;
}

class TimeTrackingService {
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
    const entries = this.timeEntries.filter(
      (e) => e.topicId === topicId && e.subTopicId === subTopicId
    );
    return entries.reduce((total, entry) => {
      const end = entry.endTime || Date.now();
      return total + (end - entry.startTime);
    }, 0);
  }

  getTotalDuration(topicId: string): number {
    const entries = this.timeEntries.filter((e) => e.topicId === topicId);
    return entries.reduce((total, entry) => {
      const end = entry.endTime || Date.now();
      return total + (end - entry.startTime);
    }, 0);
  }
}

export const timeTrackingService = new TimeTrackingService();