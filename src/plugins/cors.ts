import fp from "fastify-plugin";
import fastifyCors, { FastifyCorsOptions } from "@fastify/cors";
const logger = require("pino")();

module.exports = fp<FastifyCorsOptions>(async (fastify, opts) => {
  logger.info("Loading CORS plugin");
  fastify.register(fastifyCors, { origin: true });
});
