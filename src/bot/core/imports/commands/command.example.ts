import { ICommand } from "@interfaces";

const command: ICommand = {
  command: "example", // Триггер команды
  hidden: true, // Скрытие из списка команд бота
  description: "Начальное приветствие", // Описание команды
  inDevOnly: false, // Команда будет доступна только во время разработки "start:dev"
  // Что будет выполнено при использовании команды
  callback: async (ctx) => {},
};

export default command;
