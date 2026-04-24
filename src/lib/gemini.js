import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

export async function createChatSession() {
  const model = "gemini-2.5-flash";
  const systemInstruction = `You are Omni-Bot, a highly knowledgeable and impartial AI assistant designed to help citizens understand the election process, voting laws, and civic duties. 
Answer questions concisely, accurately, and without political bias. If you don't know the specific local laws, advise the user to check their local state election board website.
Keep your answers under 3 paragraphs to ensure readability in a chat UI.`;

  // We use the chats service to maintain conversation history automatically
  const chat = ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.2, // Low temperature for factual accuracy
    }
  });

  return chat;
}

export async function analyzeClaim(claim) {
  const model = "gemini-2.5-flash";
  const systemInstruction = `You are an impartial fact-checking system. Analyze the following claim regarding US elections or voting. 
Classify the claim into one of three categories: 'danger' (highly likely to be false or misleading), 'warning' (missing critical context, partially true, or debatable), or 'safe' (verified as true based on standard US election procedures).
You MUST respond with a JSON object exactly matching the schema.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      status: { type: Type.STRING, enum: ['danger', 'warning', 'safe'] },
      title: { type: Type.STRING, description: "A short, 2-5 word title summarizing your finding" },
      description: { type: Type.STRING, description: "A 1-2 sentence explanation of WHY this classification was given based on facts." },
      source: { type: Type.STRING, description: "A generic verified source type (e.g., 'Federal Election Commission', 'State Voting Laws', 'CISA')" }
    },
    required: ["status", "title", "description", "source"]
  };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: `Analyze this claim: "${claim}"`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const resultText = response.text;
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Error analyzing claim with Gemini:", error);
    return {
      status: 'warning',
      title: 'Analysis Failed',
      description: 'We could not analyze this claim at this time. Please manually verify with your local election board.',
      source: 'System Error'
    };
  }
}
