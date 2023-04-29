import { Menu } from "@grammyjs/menu";
import {
  ORDER_PIZZA_MENU_ID,
  ORDER_PIZZA_MENU_NAME,
  PIZZA_ORDERED,
} from "@const";
import { OrderPizzaMenu } from "@ui";
import { UserRepository } from "@repos";

export default new Menu(ORDER_PIZZA_MENU_ID).text(
  ORDER_PIZZA_MENU_NAME,
  async (ctx) => {
    const match = await UserRepository.findOne({
      where: {
        userId: ctx.from?.id,
      },
    });
    if (match) {
      match.orders += 1;
      await UserRepository.save(match);
      await ctx.reply(PIZZA_ORDERED(match.orders), {
        reply_markup: OrderPizzaMenu,
      });
    } else {
      const user = UserRepository.create({
        userId: ctx.from?.id,
        orders: 1,
      });
      await UserRepository.save(user);
      await ctx.reply(PIZZA_ORDERED(user.orders), {
        reply_markup: OrderPizzaMenu,
      });
    }
  }
);
