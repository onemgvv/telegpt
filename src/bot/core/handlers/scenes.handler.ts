import glob from "glob-promise";
import { IHandler } from "@interfaces";
import { BotContext, CustomBot } from "@Types";
import { Table } from "console-table-printer";
import { SCENES_PATH } from "@const";
import { Scene } from "grammy-scenes";

export default class CommandsHandler implements IHandler {
  name = "Scenes";
  init = async (bot: CustomBot<BotContext>) => {
    const table = new Table({
      title: `${this.name} Loaded`,
    });
    const files = await glob(SCENES_PATH);
    let count = 0;
    await Promise.allSettled(
      files.map(async (f) => {
        const file = (await import(f)).default as Scene<BotContext>;
        table.addRow(
          {
            name: file.id,
            state: "Loaded",
          },
          {
            color: "green",
          }
        );
        bot.handlers.scenes.push(file);
        count++;
      })
    );
    table.printTable();
    return count;
  };
}
