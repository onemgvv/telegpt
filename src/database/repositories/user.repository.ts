import AppDataSource from "@db";
import { User } from "@entities";

export default AppDataSource.getRepository(User);
