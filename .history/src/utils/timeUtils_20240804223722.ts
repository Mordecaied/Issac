// src/utils/timeUtils.ts

export const formatDuration = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
  
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (remainingMinutes > 0 || hours > 0) parts.push(`${remainingMinutes}m`);
    parts.push(`${remainingSeconds}s`);
  
    return parts.join(' ');
  };
  
  export const millisecondsToMinutes = (milliseconds: number): number => {
    return Math.round(milliseconds / 60000);
  };
  
  export const minutesToMilliseconds = (minutes: number): number => {
    return minutes * 60000;
  };

  
  
  export default {
    formatDuration,
    millisecondsToMinutes,
    minutesToMilliseconds,
  };