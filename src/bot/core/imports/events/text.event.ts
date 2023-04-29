import { BotContext } from '@Types';
import { code } from '@grammyjs/parse-mode';
import { IEvent } from '@interfaces';
import { Filter, FilterQuery } from 'grammy';
import { openai } from 'openai/openai';

const event: IEvent = {
  name: 'Handle text messages',
  filter: 'message:text',
  callback: async (ctx: Filter<BotContext, FilterQuery>) => {
    try {
      const receiverText = code('Запрос принят в обработку. Ожидаю ответ мастера...').toString();
      await ctx.reply(receiverText);

      ctx.session.messages.push({ role: openai.getRoles().USER, content: ctx.message!.text! });
      const response = await openai.chat(ctx.session.messages);

      ctx.session.messages.push({ role: openai.getRoles().ASSISTANT, content: response.content });

      ctx.reply(response.content);
    } catch (error) {}
  },
};

export default event;
