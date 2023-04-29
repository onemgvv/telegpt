import { ICommand } from '@interfaces';
import { GetInitialSession } from 'bot/utils/init-session.utils';

const command: ICommand = {
  command: 'newcontext',
  hidden: true,
  description: 'Очистка контекста',
  inDevOnly: false,
  callback: async (ctx) => {
    ctx.session = GetInitialSession();
    ctx.reply('Привет! Жду твоего голосового');
  },
};

export default command;
