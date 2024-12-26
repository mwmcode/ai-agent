import process from 'node:process';
import { runAgent } from './src/agent';
import { tools } from './src/services/index';

const userMessage = process.argv[2];
if (!userMessage) {
  console.error('Missing user message!');
  process.exit(1);
}

await runAgent({ userMessage, tools });
