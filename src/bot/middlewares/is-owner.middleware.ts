import { Middleware } from "grammy";
import { BotContext } from "@Types";
import { OWNER } from "@env";

const isOwnerMiddleware: Middleware<BotContext> = async (ctx, next) => {
  ctx.config = {
    botOwner: OWNER,
    isOwner: ctx.from?.id === OWNER,
  };
  await next();
};

export default isOwnerMiddleware;
