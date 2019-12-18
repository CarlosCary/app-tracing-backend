"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasksController_1 = require("../controllers/tasksController");
class TasksRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', tasksController_1.tasksController.createTask);
        this.router.post('/document', tasksController_1.tasksController.addDocumentTask);
        this.router.post('/form', tasksController_1.tasksController.addFormTask);
        this.router.post('/student/task', tasksController_1.tasksController.addTaskStudent);
    }
}
const tasksRoutes = new TasksRoutes();
exports.default = tasksRoutes.router;
