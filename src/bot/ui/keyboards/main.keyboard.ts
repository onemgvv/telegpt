import { Keyboard } from "grammy";
import {
  MAIN_KEYBOARD_OPEN_WEBAPP,
  MAIN_KEYBOARD_ORDER_PIZZA,
  MAIN_KEYBOARD_PROFILE,
  MAIN_KEYBOARD_REGISTER_AGAIN,
} from "@const";

export default new Keyboard()
  .text(MAIN_KEYBOARD_ORDER_PIZZA)
  .webApp(MAIN_KEYBOARD_OPEN_WEBAPP, "https://grammy.dev")
  .row()
  .text(MAIN_KEYBOARD_PROFILE)
  .text(MAIN_KEYBOARD_REGISTER_AGAIN);
