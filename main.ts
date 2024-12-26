import process from 'node:process';
import { runAgent } from './src/agent.ts';
import { z } from 'zod';

const userMessage = process.argv[2];
if (!userMessage) {
  console.error('Missing user message!');
  process.exit(1);
}

const weatherTool = {
  name: 'get_weather',
  description:
    'use this to get the weather. does not require specifying a location',
  parameters: z.object({
    reasoning: z.string().describe('why did you pick this tool?'),
  }),
};

await runAgent({ userMessage, tools: [weatherTool] });
