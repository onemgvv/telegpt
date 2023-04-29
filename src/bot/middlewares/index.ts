import { Bot, Middleware } from "grammy";
import glob from "glob-promise";
import { BotContext } from "@Types";
import { Table } from "console-table-printer";
import { MIDDLEWARES_PATH } from "@const";

const InitMiddlewares = async (bot: Bot<BotContext>) => {
  const table = new Table({
    title: "Middlewares",
  });
  const files = await glob(MIDDLEWARES_PATH);
  await Promise.allSettled(
    files.map(async (f) => {
      const middleware: Middleware<BotContext> = (await import(f)).default;
      table.addRow(
        { name: f.split("/").pop(), state: "Loaded" },
        {
          color: "green",
        }
      );
      bot.use(middleware);
    })
  );
  table.printTable();
};

export default InitMiddlewares;
