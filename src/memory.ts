import { JSONFilePreset } from 'lowdb/node';
import type { AIMessage, DataT, MessageWithMetadata } from './types.ts';

export function addMetadata(message: AIMessage): MessageWithMetadata {
  return {
    ...message,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}

export function removeMetadata(message: MessageWithMetadata): AIMessage {
  // deno-lint-ignore no-unused-vars
  const { id, createdAt, ...messageWithoutMetadata } = message;
  return messageWithoutMetadata;
}

export async function getDb() {
  const db = await JSONFilePreset<DataT>('db.json', { messages: [] });
  return db;
}

export async function addMessages(messages: AIMessage[]) {
  const db = await getDb();
  db.data.messages.push(...messages.map(addMetadata));
  await db.write();
}

export async function getMessages() {
  const db = await getDb();
  return db.data.messages.map(removeMetadata);
}