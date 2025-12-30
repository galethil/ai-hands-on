import { ChatOllama } from '@langchain/ollama';
import dotenv from 'dotenv';
import { createAgent } from 'langchain';

dotenv.config({ quiet: true });

const model = new ChatOllama({
  model: process.env.OLLAMA_MODEL || 'llama3.1:8b',
  temperature: 0.7,
  maxRetries: 2,
});

const agent = createAgent({
  model,
});

const run = async (weatherQuery: string) => {
  const response = await agent.invoke({
    messages: weatherQuery,
  });
  console.log('Response:', response);
};

run('What is the the weather like in Paris?');
