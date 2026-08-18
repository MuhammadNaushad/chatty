import axios from 'axios';

import Config from 'react-native-config';

const HF_API_KEY = Config.HF_API_KEY;

const BASE_URL = 'https://api-inference.huggingface.co/models';

const hfClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${HF_API_KEY}`,
    'Content-Type': 'application/json',
  },
  timeout: 30000, // HF models cold start hone mein time lete hain
});

// ✅ Text Generation (e.g. GPT-2, Mistral, etc.)
export const generateText = async (
  modelId: string,
  prompt: string,
): Promise<string> => {
  const response = await hfClient.post(`/${modelId}`, {
    inputs: prompt,
    parameters: {
      max_new_tokens: 200,
      temperature: 0.7,
    },
  });

  return response.data[0]?.generated_text ?? '';
};

// ✅ Text Classification (e.g. sentiment)
export const classifyText = async (
  modelId: string,
  text: string,
): Promise<any[]> => {
  const response = await hfClient.post(`/${modelId}`, {
    inputs: text,
  });

  return response.data;
};

// ✅ Question Answering
export const questionAnswering = async (
  modelId: string,
  question: string,
  context: string,
): Promise<string> => {
  const response = await hfClient.post(`/${modelId}`, {
    inputs: { question, context },
  });

  return response.data?.answer ?? '';
};
