"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasksController_1 = require("../controllers/tasksController");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, body, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer_1.default({ storage: storage, limits: {
        fileSize: 1024 * 1024 * 10 //10 MB Max file size
    } });
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
        this.router.post('/students', tasksController_1.tasksController.assignTaskAllStudentsSubject);
        this.router.get('/all/:id_student', tasksController_1.tasksController.getAllTaskStudentAvaliable);
        this.router.get('/form/:id_task', tasksController_1.tasksController.getFormRequestedTask);
        this.router.post('/send', upload.array("fileDocument", 12), tasksController_1.tasksController.sendTask);
    }
}
const tasksRoutes = new TasksRoutes();
exports.default = tasksRoutes.router;
