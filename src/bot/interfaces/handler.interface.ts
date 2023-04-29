import { BotContext, CustomBot } from "@Types";

export default interface IHandler {
  name: string;
  init: (bot: CustomBot<BotContext>) => Promise<number>;
}
