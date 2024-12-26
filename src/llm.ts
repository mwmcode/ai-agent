import type { AIMessage, ToolT } from './types';
import { openai } from './ai';
import { zodFunction } from 'openai/helpers/zod.mjs';
import { systemPrompt } from './systemPrompt';

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
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    temperature: 0.1,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  });

  return response.choices[0].message;
}
