import glob from 'glob-promise';
import { ICommand, IHandler } from '@interfaces';
import { BotContext, CustomBot } from '@Types';
import { Table } from 'console-table-printer';
import { IS_PROD } from '@env';
import { COMMANDS_PATH } from '@const';

export default class CommandsHandler implements IHandler {
  name = 'Commands';
  init = async (bot: CustomBot<BotContext>) => {
    const table = new Table({
      title: 'Commands Loaded',
    });
    const files = await glob(COMMANDS_PATH);
    let count = 0;
    await Promise.allSettled(
      files.map(async (f) => {
        const file = (await import(f)).default as ICommand;
        if (IS_PROD && file.inDevOnly) return;
        if (!file.command)
          return table.addRow(
            { name: f.split('/').pop(), state: 'Missing name' },
            {
              color: 'red',
            }
          );
        if (!file.description)
          return table.addRow(
            { name: file.command, state: 'Missing description' },
            {
              color: 'red',
            }
          );
        if (!file.callback)
          return table.addRow(
            { name: file.command, state: 'Missing callback' },
            {
              color: 'red',
            }
          );
        table.addRow(
          {
            name: file.command,
            state: 'Loaded',
            hidden: file.hidden ? 'Yes' : 'No',
          },
          {
            color: 'green',
          }
        );
        bot.handlers.commands.push(file);
        count++;
      })
    );
    table.printTable();
    await bot.api.setMyCommands(bot.handlers.commands.filter((c) => !c.hidden));
    return count;
  };
}
