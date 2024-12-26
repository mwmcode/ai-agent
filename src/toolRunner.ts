import type OpenAI from 'openai';

function getWeather(params: { userMessage: string; toolArgs: any }) {
  return 'very cold. 17deg';
}

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  };
  switch (toolCall.function.name) {
    case 'get_weather':
      return getWeather(input);

    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`);
  }
};