import { ChatCompletionRequestMessage } from 'openai';

export const GetInitialSession = () => {
  return { messages: [] as ChatCompletionRequestMessage[] };
};
