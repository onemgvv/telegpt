import { ICommand } from "@interfaces";

const command: ICommand = {
  command: "id",
  hidden: true,
  description: "Узнать ID",
  callback: async (ctx) => {
    if (ctx.config.isOwner)
      await ctx.reply(`ID бота - "${ctx.me.id}\nВаш ID - ${ctx.from?.id}"`);
  },
};

export default command;
