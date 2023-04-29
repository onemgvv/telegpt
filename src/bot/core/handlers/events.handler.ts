import glob from 'glob-promise';
import { IEvent, IHandler } from '@interfaces';
import { BotContext, CustomBot } from '@Types';
import { Table } from 'console-table-printer';
import { IS_PROD } from '@env';
import { EVENTS_PATH } from '@const';

export default class EventsHandler implements IHandler {
  name = 'Events';
  init = async (bot: CustomBot<BotContext>) => {
    const table = new Table({
      title: 'Events Loaded',
    });
    const files = await glob(EVENTS_PATH);
    let count = 0;
    await Promise.allSettled(
      files.map(async (f) => {
        const file = (await import(f)).default as IEvent;
        if (!file.name)
          return table.addRow(
            { name: f.split('/').pop(), state: 'Missing name' },
            {
              color: 'red',
            }
          );

        if (!file.filter)
          return table.addRow(
            { name: f.split('/').pop(), state: 'Missing filter' },
            {
              color: 'red',
            }
          );
        if (!file.callback)
          return table.addRow(
            { name: file.name, state: 'Missing callback' },
            {
              color: 'red',
            }
          );
        table.addRow(
          {
            name: file.name,
            state: 'Loaded',
          },
          {
            color: 'green',
          }
        );
        bot.on(file.filter, file.callback);
        count++;
      })
    );
    table.printTable();
    await bot.api.setMyCommands(bot.handlers.commands.filter((c) => !c.hidden));
    return count;
  };
}
