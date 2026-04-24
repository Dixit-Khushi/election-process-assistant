import { describe, it, expect, vi } from 'vitest';
import { analyzeClaim } from './gemini';

// Mock the GoogleGenAI module to prevent real API calls during tests
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      chats: {
        create: vi.fn().mockReturnValue({
          sendMessage: vi.fn().mockResolvedValue({ text: 'Mocked response' })
        })
      },
      models: {
        generateContent: vi.fn().mockResolvedValue({
          text: JSON.stringify({
            status: 'safe',
            title: 'Mock Title',
            description: 'Mock description',
            source: 'Mock Source'
          })
        })
      }
    })),
    Type: {
      OBJECT: 'OBJECT',
      STRING: 'STRING'
    }
  };
});

describe('Gemini AI Module', () => {
  it('should initialize and analyze a claim successfully', async () => {
    const result = await analyzeClaim('Test claim');
    expect(result).toBeDefined();
    expect(result.status).toBe('safe');
    expect(result.title).toBe('Mock Title');
  });
});
