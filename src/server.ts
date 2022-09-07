import { FastifyReply, FastifyRequest } from "fastify";
import * as dotenv from "dotenv";
import fjwt from "@fastify/jwt";
import buildGetJwks from "get-jwks";
const Fastify = require("fastify");

import app, { appConfig } from "./app";

dotenv.config();

const fastify = Fastify()({
  trustProxy: true,
  logger: {
    level: process.env.LOG_LEVEL || "error",
    prettifier: require("pino-pretty"),
    prettyPrint: {
      errorProps: "hint, detail",
      levelFirst: true,
      crlf: true,
    },
  },
});
const getJwks = buildGetJwks();

fastify.register(fjwt, {
  decode: { complete: true },
  secret: (request: any, token: any, callback: any) => {
    const {
      header: { kid, alg },
      payload: { iss },
    } = token;
    getJwks
      .getPublicKey({ kid, domain: iss, alg })
      .then((publicKey: any) => callback(null, publicKey), callback);
  },
});

fastify.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify();
});

fastify.register(app);

fastify.listen({ port: appConfig.port }, function (err: any, address: any) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
