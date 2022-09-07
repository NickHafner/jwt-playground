import fp from "fastify-plugin";
import fastifyHelmet, { FastifyHelmetOptions } from "@fastify/helmet";
const logger = require("pino")();

module.exports = fp<FastifyHelmetOptions>(async (fastify, opts) => {
  logger.info("Loading helmet plugin");
  fastify.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseURI: ["'self'"],
        objectSrc: ["'self'"],
        frameSrc: ["'self'"],
        formAction: ["'self'"],
      },
    },
    frameguard: true,
  });
});
