"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = __importDefault(require("../controllers/studentController"));
class StudentRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', studentController_1.default.list);
        this.router.post('/new', studentController_1.default.create);
    }
}
const studentRoutes = new StudentRoutes();
exports.default = studentRoutes.router;
