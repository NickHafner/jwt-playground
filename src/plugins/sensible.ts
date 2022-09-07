import fp from "fastify-plugin";
import sensible, { SensibleOptions } from "@fastify/sensible";
const logger = require("pino")();

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp<SensibleOptions>(async (fastify, opts) => {
  logger.info("Loading sensible plugin");
  fastify.register(sensible);
});
