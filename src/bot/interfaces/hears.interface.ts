import { HearsContext } from "grammy";
import { BotContext } from "@Types";

export default interface IHears {
  trigger: string | RegExp;
  callback: (ctx: HearsContext<BotContext>) => any;
}
