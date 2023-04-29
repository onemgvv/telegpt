import { ChatCompletionRequestMessage } from 'openai';
import { ScenesSessionFlavor } from 'grammy-scenes';

type SessionData = ScenesSessionFlavor & {
  messages: ChatCompletionRequestMessage[];
};

export default SessionData;
