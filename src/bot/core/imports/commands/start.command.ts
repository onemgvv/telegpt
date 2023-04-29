import { ICommand } from '@interfaces';
import { GetInitialSession } from 'bot/utils/init-session.utils';

const command: ICommand = {
  command: 'start',
  hidden: true,
  description: 'Начальное приветствие',
  callback: async (ctx) => {
    ctx.session = GetInitialSession();
    ctx.reply('Привет! Жду твоего голосового');
  },
};

export default command;
