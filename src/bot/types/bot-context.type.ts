import { Context, SessionFlavor } from 'grammy';
import { IBotConfig } from '@interfaces';
import { HydrateFlavor } from '@grammyjs/hydrate';
import { ParseModeContext } from '@grammyjs/parse-mode';
import { FileFlavor } from '@grammyjs/files';
import { SessionData } from '@Types';
import { ScenesFlavor } from 'grammy-scenes';

type BotContext = {
  config: IBotConfig;
} & SessionFlavor<SessionData> &
  ScenesFlavor &
  HydrateFlavor<ParseModeContext> &
  FileFlavor<Context>;

export default BotContext;
