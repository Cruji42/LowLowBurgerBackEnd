"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
// DEPLOY
// export const pool = new Pool({
//     user:'ikdpcqjiaqzovf',
//     host:'ec2-23-20-168-40.compute-1.amazonaws.com',
//     password:'d689f2296a72864be45270a9b0f757de26f77e668474d7b49d9de4d9fca4c07e',
//     database:'d8rdvtof32nulh',
//     port: 5432
// });
exports.pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    password: ' ',
    database: 'LLB_Local',
    port: 5432
});
