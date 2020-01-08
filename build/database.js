"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
const auth = process.env.DB_CONNECTION;
;
pool.getConnection()
    .then(connection => {
    pool.releaseConnection(connection);
    console.log("DB is connected");
});
mongoose_1.default.connect(auth, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connected to mongoDB"));
mongoose_1.default.set('useFindAndModify', false);
exports.default = pool;
