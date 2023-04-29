import { Middleware } from "grammy";
import { BotContext } from "@Types";

const loggerMiddleware: Middleware<BotContext> = async (ctx, next) => {
  if (ctx.message?.text)
    console.log(
      `[LOG] @${ctx.from?.username} (${ctx.from?.id}) - ${ctx.message.text}`
    );
  await next();
};

export default loggerMiddleware;
