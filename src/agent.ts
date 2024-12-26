import { runLLM } from './llm.ts';
import { addMessages, getMessages } from './memory.ts';
import { ToolT } from './types.ts';
import { logMessage, showLoader } from './ui.ts';

export async function runAgent({
  userMessage,
  tools = [],
}: {
  userMessage: string;
  tools: ToolT[];
}) {
  await addMessages([{ role: 'user', content: userMessage }]);
  const loader = showLoader('🤔');
  const history = await getMessages();
  const response = await runLLM({ messages: history, tools });

  if (response.tool_calls) {
    console.log(response.tool_calls);
  }
  await addMessages([response]);
  loader.stop();
  // logMessage(response);
  return getMessages();
}
