import { IHears } from "@interfaces";
import {
  MAIN_KEYBOARD_PROFILE,
  PROFILE_GATHERING_THE_DATA,
  PROFILE_MESSAGE,
  PROFILE_NOT_REGISTERED,
} from "@const";
import { UserRepository } from "@repos";

const hears: IHears = {
  trigger: MAIN_KEYBOARD_PROFILE,
  callback: async (ctx) => {
    const msg = await ctx.reply(PROFILE_GATHERING_THE_DATA);
    const match = await UserRepository.findOne({
      where: {
        userId: ctx.from?.id,
      },
    });
    setTimeout(async () => {
      if (match) {
        await msg.editText(
          PROFILE_MESSAGE(match.name, match.age, match.orders)
        );
      } else {
        await msg.editText(PROFILE_NOT_REGISTERED);
      }
    }, 2500);
  },
};

export default hears;
