import { CommandContext } from "grammy";
import { BotContext } from "@Types";

export default interface ICommand {
  command: string;
  description: string;
  callback: (ctx: CommandContext<BotContext>) => any;
  hidden?: boolean;
  inDevOnly?: boolean;
}
