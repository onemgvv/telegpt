import { OPENAI_API_KEY } from 'environment/openai.env';
import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from 'openai';

export type Roles = {
  ASSISTANT: ChatCompletionRequestMessageRoleEnum;
  USER: ChatCompletionRequestMessageRoleEnum;
  SYSTEM: ChatCompletionRequestMessageRoleEnum;
};

class OpenAI {
  private core: OpenAIApi;
  private roles: Roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  };

  constructor() {
    const config = new Configuration({
      apiKey: OPENAI_API_KEY,
    });

    this.core = new OpenAIApi(config);
  }

  getRoles(): Roles {
    return this.roles;
  }

  async chat(messages: ChatCompletionRequestMessage[]): Promise<ChatCompletionResponseMessage> {
    let data = {
      role: this.roles.USER,
      content: '',
    } as ChatCompletionResponseMessage;

    try {
      const response = await this.core.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      });
      data = response.data.choices[0].message!;

      return data;
    } catch (error: any) {
      console.log('Error while chat completion:', error.message);
    }

    return data;
  }

  async transcription(filepath: string): Promise<string> {
    let text = '';
    try {
      const response = await this.core.createTranscription(file, 'whisper-1');
      text = response.data.text;
      return text;
    } catch (error: any) {
      console.log('Error while transcription voice:', error.message);
    }

    return text;
  }
}

export const openai = new OpenAI();
