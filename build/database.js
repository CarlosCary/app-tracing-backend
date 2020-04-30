"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const auth = process.env.DB_CONNECTION;
;
mongoose_1.default.connect(auth, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connected to mongoDB"));
mongoose_1.default.set('useFindAndModify', false);
exports.default = mongoose_1.default;
