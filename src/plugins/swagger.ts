import fp from "fastify-plugin";
import fastifySwagger, { SwaggerOptions } from "@fastify/swagger";
const logger = require("pino")();

/**
 * This plugins adds swager to our api
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp<SwaggerOptions>(
  async (fastify, opts) => {
    logger.info("Loading swagger plugin");
    fastify.register(fastifySwagger, {
      routePrefix: "/swagger",
      swagger: {
        info: {
          title: "Random Testing API",
          description: "CRUD Notes",
          version: "0.1.0",
        },
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here",
        },
        host: "localhost:3000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
      },
      exposeRoute: true,
    });
  },
  { name: "swagger" }
);
