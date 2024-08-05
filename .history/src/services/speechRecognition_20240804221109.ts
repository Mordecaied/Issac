// src/services/speechRecognition.ts

export class SpeechRecognitionService {
    private recognition: SpeechRecognition | null = null;
    private onTranscriptCallback: ((transcript: string) => void) | null = null;
  
    constructor() {
      if ('webkitSpeechRecognition' in window) {
        this.recognition = new (window as any).webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.onresult = this.handleResult.bind(this);
      }
    }
  
    private handleResult(event: SpeechRecognitionEvent) {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      if (this.onTranscriptCallback) {
        this.onTranscriptCallback(transcript);
      }
    }
  
    public start(onTranscript: (transcript: string) => void) {
      if (this.recognition) {
        this.onTranscriptCallback = onTranscript;
        this.recognition.start();
      } else {
        console.error('Speech recognition is not supported in this browser.');
      }
    }
  
    public stop() {
      if (this.recognition) {
        this.recognition.stop();
        this.onTranscriptCallback = null;
      }
    }
  }
  
  export const speechRecognitionService = new SpeechRecognitionService();