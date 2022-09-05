import { FastifyReply } from "fastify";
import * as dotenv from "dotenv";
const Fastify = require("fastify");
const fjwt = require("@fastify/jwt");
const buildGetJwks = require("get-jwks");

import app from "./app";

dotenv.config();

const fastify = Fastify()({
  logger: true,
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

fastify.addHook("onRequest", async (request: any, reply: FastifyReply) => {
  await request.jwtVerify();
});

fastify.register(app);

fastify.listen({ port: 3000 }, function (err: any, address: any) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
