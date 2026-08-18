import axios from 'axios';
import Config from 'react-native-config';

const GROQ_MODEL = 'groq/compound-mini';

const groqClient = axios.create({
  baseURL: 'https://api.groq.com/openai/v1',
  headers: {
    Authorization: `Bearer ${Config.GROQ_API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// ✅ Text Generation / Chat
export const generateText = async (prompt: string): Promise<string> => {
  const response = await groqClient.post('/chat/completions', {
    model: GROQ_MODEL,
    messages: [{ role: 'user', content: prompt }],
    max_tokens: 500,
    temperature: 0.7,
  });
  return response.data.choices[0]?.message?.content ?? '';
};

// ✅ Chat with history (multi-turn conversation)
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const chatWithHistory = async (messages: Message[]): Promise<string> => {
  const response = await groqClient.post('/chat/completions', {
    model: GROQ_MODEL,
    messages,
    max_tokens: 500,
    temperature: 0.7,
  });
  return response.data.choices[0]?.message?.content ?? '';
};

// ✅ Chat with system prompt
export const chatWithSystemPrompt = async (
  systemPrompt: string,
  userMessage: string,
): Promise<string> => {
  const response = await groqClient.post('/chat/completions', {
    model: GROQ_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    max_tokens: 500,
    temperature: 0.7,
  });
  return response.data.choices[0]?.message?.content ?? '';
};

// ✅ Available Groq models fetch karo
export const getAvailableModels = async (): Promise<string[]> => {
  const response = await groqClient.get('/models');
  return response.data.data.map((model: any) => model.id);
};
