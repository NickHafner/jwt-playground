import { join } from "path";
import { FastifyPluginAsync } from "fastify";
import fastifyAutoload from "@fastify/autoload";
import { appConfig, AppConfig } from "../utils/appConfig";

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
module.exports = app;
declare module "fastify" {
  export interface FastifyInstance {
    appConfig: AppConfig;
  }
}
