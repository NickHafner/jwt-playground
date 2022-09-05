"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function loadEnv(key) {
    const val = process.env[key];
    if (!val) {
        throw new Error(`${key} is a required env variable`);
    }
    return val;
}
exports.default = loadEnv;
