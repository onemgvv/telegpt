import { BotContext } from '@Types';
import { Middleware, FilterQuery, Filter } from 'grammy';

export default interface IEvent {
  name: string;
  filter: FilterQuery;
  callback: (ctx: Filter<BotContext, FilterQuery>) => any;
}
