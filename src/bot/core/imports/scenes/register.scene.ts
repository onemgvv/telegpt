import { Scene } from "grammy-scenes";
import { BotContext } from "@Types";
import {
  REGISTER_SCENE_ENTER_YOUR_AGE,
  REGISTER_SCENE_ENTER_YOUR_NAME,
  REGISTER_SCENE_ID,
  REGISTER_SCENE_REGISTERED,
  REGISTER_SCENE_REGISTERED_AGAIN,
  START_OWNER,
  START_USER,
} from "@const";
import { MainKeyboard } from "@ui";
import { UserRepository } from "@repos";

// Ознакомтесь с документацией: https://github.com/IlyaSemenov/grammy-scenes

const mainScene = new Scene<BotContext>(REGISTER_SCENE_ID);

mainScene.do(async (ctx) => {
  await ctx.reply(REGISTER_SCENE_ENTER_YOUR_NAME);
  console.log(ctx.scene);
});

mainScene.wait().on("message:text", async (ctx) => {
  const name = ctx.message.text;
  ctx.session.name = name;
  ctx.scene.session;
  await ctx.reply(REGISTER_SCENE_ENTER_YOUR_AGE(name));
  ctx.scene.resume();
});

mainScene.wait().on("message:text", async (ctx) => {
  const age = Number(ctx.message.text);
  if (!age) {
    await ctx.reply(REGISTER_SCENE_ENTER_YOUR_AGE(ctx.session.name));
  } else {
    ctx.session.age = age;
    const match = await UserRepository.findOne({
      where: {
        userId: ctx.from.id,
      },
    });
    if (match) {
      match.age = age;
      match.name = ctx.session.name;
      await UserRepository.save(match);
      const msg = await ctx.reply(REGISTER_SCENE_REGISTERED_AGAIN);
      setTimeout(() => msg.delete().catch(() => {}), 10 * 1000);
      await ctx.reply(ctx.config.isOwner ? START_OWNER : START_USER, {
        reply_markup: {
          keyboard: MainKeyboard.build(),
          resize_keyboard: true,
        },
      });
    } else {
      const user = UserRepository.create({
        name: ctx.session.name,
        age,
        userId: ctx.from.id,
      });
      await UserRepository.save(user);
      const msg = await ctx.reply(REGISTER_SCENE_REGISTERED);
      setTimeout(() => msg.delete().catch(() => {}), 10 * 1000);
      await ctx.reply(ctx.config.isOwner ? START_OWNER : START_USER, {
        reply_markup: {
          keyboard: MainKeyboard.build(),
          resize_keyboard: true,
        },
      });
    }
    ctx.scene.resume();
  }
});

export default mainScene;
