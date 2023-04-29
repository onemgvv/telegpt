import glob from "glob-promise";
import { BotContext, CustomBot } from "@Types";
import { IHandler } from "@interfaces";
import { Table } from "console-table-printer";
import { HANDLERS_PATH } from "@const";
import { ScenesComposer } from "grammy-scenes";

const InitHandlers = async (bot: CustomBot<BotContext>) => {
  const table = new Table({
    title: "Handlers Loaded",
  });
  const files = await glob(HANDLERS_PATH);
  await Promise.allSettled(
    files.map(async (f) => {
      const file = await import(f);
      const handler: IHandler = new file.default();
      if (!handler.name) {
        return table.addRow(
          { name: f.split("/").pop(), state: "Missing name" },
          {
            color: "red",
          }
        );
      }
      if (!handler.init) {
        return table.addRow(
          { name: handler.name, state: "Missing init" },
          {
            color: "red",
          }
        );
      }
      const count = await handler.init(bot);
      table.addRow(
        { name: handler.name, state: `Loaded (${count})` },
        {
          color: "green",
        }
      );
    })
  );
  const scenes = new ScenesComposer<BotContext>(...bot.handlers.scenes);
  bot.use(scenes.manager());
  bot.use(scenes);
  bot.command(
    bot.handlers.commands.map((c) => c.command),
    (ctx) => {
      const cmd = bot.handlers.commands.find(
        (c) => c.command === ctx.message?.text?.replace("/", "")
      );
      if (cmd) return cmd.callback(ctx);
    }
  );
  bot.hears(
    bot.handlers.hears.map((h) => h.trigger),
    (ctx) => {
      const hears = bot.handlers.hears.find(
        (h) => h.trigger === ctx.message?.text
      );
      if (hears) return hears.callback(ctx);
    }
  );
  table.printTable();
};

export default InitHandlers;
