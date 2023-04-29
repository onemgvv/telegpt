import { BotContext, CustomBot } from '@Types';
import { TOKEN } from '@env';

const bot = new CustomBot<BotContext>(TOKEN, {
  client: {
    canUseWebhookReply: (method) => method === 'sendChatAction',
  },
});

process.once('SIGINT', bot.stop);
process.once('SIGTERM', bot.stop);

export default bot;
