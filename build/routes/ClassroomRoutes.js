"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ClassroomController_1 = require("../controllers/ClassroomController");
class ClassroomRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', ClassroomController_1.classroomController.create);
    }
}
const classroomRoutes = new ClassroomRoutes();
exports.default = classroomRoutes.router;
