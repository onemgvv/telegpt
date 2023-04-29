import { Bot, GrammyError, HttpError } from 'grammy';
import { BotContext } from '@Types';
import { OWNER } from '@env';

const UseCatcher = (bot: Bot<BotContext>) => {
  bot.catch(async (err: any) => {
    const ctx = err.ctx;
    const e = err.error;
    await ctx.reply('Произошла серверная ошибка\nАдминистратор был уведомлён о произошедшем');
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    if (e instanceof GrammyError) {
      console.error('Error in request:', e.description);
      await bot.api.sendMessage(OWNER, `Ошибка при работе бота\n\n${e.description}`);
    } else if (e instanceof HttpError) {
      console.error('Could not contact Telegram:', e);
      await bot.api.sendMessage(OWNER, `Ошибка при работе бота\n\n${e}`);
    } else {
      console.error('Unknown error:', e);
      await bot.api.sendMessage(OWNER, `Ошибка при работе бота\n\n${e}`);
    }
  });
};

export default UseCatcher;
