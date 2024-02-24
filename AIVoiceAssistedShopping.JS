---
title: AI System Architecture for Voice-Activated Shopping
---
 subgraph Voice_Input_Box["Voice Input"]
        A["Voice Input"] -->|Audio Data| B["Audio Processing"];
    end

    subgraph Audio_Processing_Box["Audio Processing"]
        B -->|Processed Audio| C["Speech Recognition Algorithms"];
    end

    subgraph Speech_Recognition_Box["Speech Recognition"]
        C -->|Recognized Speech| D["Language Models"];
    end

    subgraph Transcription_Box["Transcription"]
        D -->|Interpreted Text| E["Text"];
    end

    subgraph NLU_Module_Box["NLU Module"]
        F["NLU Module"];
        E --> F;
        %% Techniques
        F["Intent Recognition"];
        F --> G["Entity Extraction"];
        G --> I["Intent Classification"];
        G --> J["Named Entity Recognition (NER)"];
        I --> K["Machine Learning Models"];
        J --> K;
    end

    style A fill:#FFCC00,stroke:#000,stroke-width:2px;
    style E fill:#33CC99,stroke:#000,stroke-width:2px;
    Voice_Input_Box -.->|Processed Audio| D;
    Audio_Processing_Box -.->|Recognized Speech| D;
