"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StudentController_1 = __importDefault(require("../controllers/StudentController"));
class StudentRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', StudentController_1.default.list);
        this.router.post('/new', StudentController_1.default.create);
    }
}
const studentRoutes = new StudentRoutes();
exports.default = studentRoutes.router;
