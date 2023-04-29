import { ChatCompletionRequestMessage } from 'openai';
import { Context, session } from 'grammy';
import { run, sequentialize } from '@grammyjs/runner';
import InitHandlers from '@handlers';
import bot from './bot';
import { UseCatcher } from '@utils';
import { hydrate } from '@grammyjs/hydrate';
import { hydrateFiles } from '@grammyjs/files';
import { apiThrottler } from '@grammyjs/transformer-throttler';
import InitMiddlewares from '@middlewares';
import { EXPRESS_PORT, IS_PROD } from '@env';
import UseMenu from '@ui';
import InitWebhook from './webhook';
import { GetInitialSession } from './utils/init-session.utils';

const StartBot = async () => {
  if (IS_PROD && EXPRESS_PORT) {
    InitWebhook();
  }

  UseCatcher(bot);

  const getSessionKey = (ctx: Context) => {
    return ctx.chat?.id.toString();
  };

  bot.api.config.use(apiThrottler());

  bot.use(hydrate());
  bot.api.config.use(hydrateFiles(bot.token));
  bot.use(sequentialize(getSessionKey));
  bot.use(
    session({
      getSessionKey,
      initial: () => GetInitialSession(),
    })
  );

  await InitMiddlewares(bot);

  await UseMenu(bot);

  await InitHandlers(bot);

  if (!IS_PROD || !EXPRESS_PORT) {
    const runner = run(bot);
    if (runner.isRunning()) {
      await bot.init();
      console.log(`Bot started - @${bot.botInfo.username}`);
    }
  }

  bot.on(':web_app_data', async (ctx) => {
    await ctx.reply('Да, это работающее веб-приложение!');
  });
};

export default StartBot;
