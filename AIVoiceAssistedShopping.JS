```
graph TD;
    title[**AI System Architecture for Voice-Activated Shopping**];
    A[Voice Input] -->|Audio Data| B[Audio Processing];
    B -->|Processed Audio| C[Speech Recognition Algorithms];
    C -->|Recognized Speech| D[Language Models];
    D -->|Interpreted Text| E[Transcription];
    B -.->|Processed Audio| D;
    C -.->|Recognized Speech| E;
    %% Techniques
    B[Spectral Subtraction, Noise Reduction] -.->|Processed Audio| D[Hidden Markov Models, Deep Learning];
    C[Hidden Markov Models, Deep Learning] -.->|Recognized Speech| E[N-gram Models, Neural Language Models];
```
