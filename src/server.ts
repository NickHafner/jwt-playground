import Fastify from "fastify";
import * as dotenv from "dotenv";
// import fjwt from "@fastify/jwt";
// import buildGetJwks from "get-jwks";
import { appConfig } from "../utils/appConfig";

const fastify = Fastify({
  logger: {
    transport:
      appConfig.env === "dev"
        ? {
            target: "pino-pretty",
            options: {
              errorProps: "hint, detail",
              levelFirst: true,
              crlf: true,
            },
          }
        : undefined,
  },
});
import app from "./app";
dotenv.config();

// const getJwks = buildGetJwks();
console.log(appConfig);
// fastify
// .register(fjwt, {
//   decode: { complete: true },
//   secret: (request: any, token: any, callback: any) => {
//     const {
//       header: { kid, alg },
//       payload: { iss },
//     } = token;
//     getJwks
//       .getPublicKey({ kid, domain: iss, alg })
//       .then((publicKey: any) => callback(null, publicKey), callback);
//   },
// })
// .addContentTypeParser("*", (req: FastifyRequest, done: any) => done());

// fastify.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
//   await request.jwtVerify();
// });

fastify.register(app);

fastify.listen({ port: parseInt(appConfig.port) }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
