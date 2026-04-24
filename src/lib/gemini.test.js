import { describe, it, expect, vi } from 'vitest';
import { analyzeClaim } from './gemini';

// Stub the environment variable before importing gemini
vi.stubEnv('VITE_GEMINI_API_KEY', 'test-api-key');

// Mock the GoogleGenAI module to prevent real API calls during tests
vi.mock('@google/genai', () => {
  const sendMessage = vi.fn().mockResolvedValue({ text: 'Mocked response' });
  const create = vi.fn().mockReturnValue({ sendMessage });
  const generateContent = vi.fn().mockResolvedValue({
    text: JSON.stringify({
      status: 'safe',
      title: 'Mock Title',
      description: 'Mock description',
      source: 'Mock Source'
    })
  });

  // The mock must be a constructor function
  function MockGoogleGenAI() {
    this.chats = { create };
    this.models = { generateContent };
  }

  return {
    GoogleGenAI: MockGoogleGenAI,
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
