import type { AIMessage, ToolT } from './types.ts';
import { openai } from './ai.ts';
import { zodFunction } from 'openai/helpers/zod.mjs';

export async function runLLM({
  messages,
  tools,
}: {
  messages: AIMessage[];
  tools?: ToolT[];
}) {
  const formattedTools = tools?.map(zodFunction) ?? [];
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    temperature: 0.1,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  });

  return response.choices[0].message;
}
