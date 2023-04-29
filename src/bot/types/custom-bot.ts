import { Context } from "grammy/out/context";
import { Bot, BotConfig } from "grammy";
import { ICommand, IHears } from "@interfaces";
import { Scene } from "grammy-scenes";
import { BotContext } from "@Types";

interface IHandlers {
  commands: ICommand[];
  hears: IHears[];
  scenes: Scene<BotContext>[];
}

export default class CustomBot<C extends Context = Context> extends Bot<C> {
  handlers: IHandlers;

  constructor(token: string, config: BotConfig<C>) {
    super(token, config);
    this.handlers = {
      hears: [],
      commands: [],
      scenes: [],
    };
  }
}
