export const BLAND_CONFIG = {
  VOICE: {
    VOICE_ID: 0, // Default voice
    TEMPERATURE: 0.7,
    REDUCE_LATENCY: true
  },
  CALL: {
    MAX_DURATION: 300, // 5 minutes
    SILENCE_TIMEOUT: 5,
    END_ON_SILENCE: true,
    RECORD: true
  }
} as const;