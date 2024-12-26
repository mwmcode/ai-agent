import { runLLM } from './llm';
import { addMessages, getMessages, saveToolResponse } from './memory';
import { runTool } from './toolRunner';
import { ToolT } from './types';
import { logMessage, showLoader } from './ui';

export async function runAgent({
  turns = 10,
  userMessage,
  tools = [],
}: {
  turns: number;
  userMessage: string;
  tools: ToolT[];
}) {
  await addMessages([{ role: 'user', content: userMessage }]);
  const loader = showLoader('🤔');
  while (true) {
    const history = await getMessages();
    const response = await runLLM({ messages: history, tools });

    await addMessages([response]);

    if (response.content) {
      loader.stop();
      logMessage(response);
      return await getMessages();
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0];
      logMessage(response);
      loader.update(`executing ${toolCall.function.name}`);
      const toolResponse = await runTool(toolCall, userMessage);
      await saveToolResponse(toolCall.id, toolResponse);
      loader.update(`executed ${toolCall.function.name}`);
    }
  }
}
