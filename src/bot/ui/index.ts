import { Table } from "console-table-printer";

export * from "./keyboards";
export * from "./menu";

import { Bot } from "grammy";
import { BotContext } from "@Types";
import glob from "glob-promise";
import { MENUS_PATH } from "@const";
import { Menu } from "@grammyjs/menu";

const UseMenu = async (bot: Bot<BotContext>) => {
  const table = new Table({
    title: "Menus",
  });
  const files = await glob(MENUS_PATH);
  await Promise.allSettled(
    files.map(async (f) => {
      const menu: Menu<BotContext> = (await import(f)).default;
      table.addRow(
        { name: f.split("/").pop(), state: "Loaded" },
        {
          color: "green",
        }
      );
      bot.use(menu);
    })
  );
  table.printTable();
};

export default UseMenu;
