import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  try {
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [{role: 'user', content: 'test'}],
    });
    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }
    console.log('\nSUCCESS');
  } catch (error) {
    console.error('OPENAI SDK ERROR:', error);
  }
}
main();
