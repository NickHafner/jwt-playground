import fp from "fastify-plugin";
import fastifySwagger, { SwaggerOptions } from "@fastify/swagger";

/**
 * This plugins adds swager to our api
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp<SwaggerOptions>(
  async (fastify: any, opts: any, next: any) => {
    fastify.register(fastifySwagger, {
      routePrefix: "/swagger",
      swagger: {
        info: {
          title: "Random testing API",
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

    next();
  },
  { name: "swagger" }
);
