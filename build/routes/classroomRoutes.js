"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classroomController_1 = require("../controllers/classroomController");
class ClassroomRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', classroomController_1.classroomController.create);
    }
}
const classroomRoutes = new ClassroomRoutes();
exports.default = classroomRoutes.router;
