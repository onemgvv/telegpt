import { BotContext } from '@Types';
import { FILE_DW_LINK, TOKEN } from '@env';
import { code } from '@grammyjs/parse-mode';
import { IEvent } from '@interfaces';
import { voiceConvertor } from 'bot/utils/voice-convertor.utils';
import { Filter, FilterQuery } from 'grammy';
import { openai } from 'openai/openai';

const event: IEvent = {
  name: 'Handle voice messages',
  filter: 'message:voice',
  callback: async (ctx: Filter<BotContext, FilterQuery>) => {
    try {
      const receiverText = code('Запрос принят в обработку. Ожидаю ответ мастера...').toString();
      await ctx.reply(receiverText);

      const file = await ctx.getFile();
      const userID = String(ctx.message!.from.id);

      const downloadLink = FILE_DW_LINK + TOKEN + '/' + file.file_path;

      const voicePath = (await voiceConvertor.create(downloadLink, userID)) as string;
      const voiceMP3Path = (await voiceConvertor.toMP3(voicePath, userID)) as string;

      const text = (await openai.transcription(voiceMP3Path)) as string;
      ctx.reply(code(`Запрос: ${text}`).toString());

      ctx.session.messages.push({ role: openai.getRoles().USER, content: text });
      const response = await openai.chat(ctx.session.messages);

      ctx.session.messages.push({ role: openai.getRoles().ASSISTANT, content: response.content });

      ctx.reply(response.content);
    } catch (error) {}
  },
};

export default event;
