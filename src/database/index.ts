import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@entities";
import {
  ORM_DATABASE,
  ORM_HOST,
  ORM_PASSWORD,
  ORM_PORT,
  ORM_USERNAME,
} from "@env";

const AppDataSource = new DataSource({
  type: "postgres",
  host: ORM_HOST,
  port: ORM_PORT,
  username: ORM_USERNAME,
  password: ORM_PASSWORD,
  database: ORM_DATABASE,
  entities: [User],
  synchronize: true,
  logging: false,
});

export default AppDataSource;
