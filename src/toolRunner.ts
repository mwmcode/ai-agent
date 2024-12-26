import type OpenAI from 'openai';
import {
  dadJoke,
  generateImage,
  reddit,
  generateImageToolDefinition,
  redditToolDefinition,
  dadJokeToolDefinition,
} from './services/index';

export async function runTool(
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  };

  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      return generateImage(input);
    case dadJokeToolDefinition.name:
      return dadJoke(input);
    case redditToolDefinition.name:
      return reddit(input);

    default:
      return `Never run this tool (${toolCall.function.name}) again! Ever!`;
  }
}
