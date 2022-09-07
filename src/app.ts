import { join } from "path";
import { FastifyPluginAsync } from "fastify";
import fastifyAutoload from "@fastify/autoload";
import { loadEnv } from "../utils";

export const appConfig = {
  appOrigin: loadEnv("CONN_PROTO") + loadEnv("HOSTNAME") + ":" + loadEnv("PORT"),
  port: loadEnv("PORT"),
};

const app: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.decorate("appConfig", appConfig);
  void fastify.register(fastifyAutoload, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });
  void fastify.register(fastifyAutoload, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app };

type AppConfig = typeof appConfig;
declare module "fastify" {
  export interface FastifyInstance {
    appConfig: AppConfig;
  }
}
