import glob from "glob-promise";
import { IHandler, IHears } from "@interfaces";
import { BotContext, CustomBot } from "@Types";
import { Table } from "console-table-printer";
import { HEARS_PATH } from "@const";

export default class CommandsHandler implements IHandler {
  name = "Hears";
  init = async (bot: CustomBot<BotContext>) => {
    const table = new Table({
      title: `${this.name} Loaded`,
    });
    const files = await glob(HEARS_PATH);
    let count = 0;
    await Promise.allSettled(
      files.map(async (f) => {
        const file = (await import(f)).default as IHears;
        if (!file.trigger)
          return table.addRow(
            { name: f.split("/").pop(), state: "Missing trigger" },
            {
              color: "red",
            }
          );
        if (!file.callback)
          return table.addRow(
            { name: file.trigger, state: "Missing callback" },
            {
              color: "red",
            }
          );
        table.addRow(
          { name: file.trigger, state: "Loaded" },
          {
            color: "green",
          }
        );
        bot.handlers.hears.push(file);
        count++;
      })
    );
    table.printTable();
    return count;
  };
}
