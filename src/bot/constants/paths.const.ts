import path from 'path';

export const HANDLERS_PATH = path.resolve('src', 'bot', 'core', 'handlers', '*.handler.ts');

export const COMMANDS_PATH = path.resolve('src', 'bot', 'core', 'imports', 'commands', '*.command.ts');

export const EVENTS_PATH = path.resolve('src', 'bot', 'core', 'imports', 'events', '*.event.ts');

export const HEARS_PATH = path.resolve('src', 'bot', 'core', 'imports', 'hears', '*.hears.ts');

export const SCENES_PATH = path.resolve('src', 'bot', 'core', 'imports', 'scenes', '*.scene.ts');

export const MIDDLEWARES_PATH = path.resolve('src', 'bot', 'middlewares', '*.middleware.ts');

export const MENUS_PATH = path.resolve('src', 'bot', 'ui', 'menu', '*.menu.ts');
