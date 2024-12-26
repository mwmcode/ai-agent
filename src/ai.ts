import OpenAI from 'openai';
import envJson from '../env.json';

export const openai = new OpenAI({
  apiKey: envJson.OPENAI_API_KEY,
});
