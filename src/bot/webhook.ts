import express from "express";
import { webhookCallback } from "grammy";
import bot from "./bot";
import fs from "fs";
import path from "path";
import http from "http";
import https from "https";
import { EXPRESS_PORT } from "@env";

const InitWebhook = () => {
  const app = express();
  app.use(express.json());

  app.use(webhookCallback(bot, "express"));

  const key = fs.existsSync(path.resolve("privkey.key"))
    ? fs.readFileSync(path.resolve("privkey.key"))
    : null;
  const cert = fs.existsSync(path.resolve("cert.pem"))
    ? fs.readFileSync(path.resolve("cert.pem"))
    : null;

  const server =
    !key || !cert
      ? http.createServer(app)
      : https.createServer(
          {
            key,
            cert,
          },
          app
        );
  server.listen(
    {
      port: EXPRESS_PORT,
      host: "127.0.0.1",
    },
    () =>
      console.log(
        `Listening on ${
          !key || !cert ? "http" : "https"
        }://127.0.0.1:${EXPRESS_PORT}`
      )
  );

  process.once("SIGINT", () => {
    console.log("SIGINT signal received: closing server");
    server.close(() => console.log("Server stopped"));
  });
  process.once("SIGTERM", () => {
    console.log("SIGTERN signal received: closing server");
    server.close(() => console.log("Server stopped"));
  });
};

export default InitWebhook;
