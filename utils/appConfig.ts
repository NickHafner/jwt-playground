import { loadEnv } from "../utils";

export const appConfig = {
  appOrigin: loadEnv("CONN_PROTO") + loadEnv("HOSTNAME") + ":" + loadEnv("PORT"),
  port: loadEnv("PORT"),
  logLevel: loadEnv("LOG_LEVEL"),
  env: loadEnv("ENV"),
};
export type AppConfig = typeof appConfig;
