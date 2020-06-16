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
        cb(null, 'uploads/');
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
        this.router.get('/all/:id_student', tasksController_1.tasksController.getAllTaskStudentAvaliable);
        this.router.get('/proffesor/all/:id_proffesor', tasksController_1.tasksController.getAllTaskProffesorAvaliable);
        this.router.get('/form/:id_task', tasksController_1.tasksController.getFormRequestedTask);
        this.router.post('/send', upload.array("fileDocument", 12), tasksController_1.tasksController.sendTask);
        this.router.get('/submitted/:id_task', tasksController_1.tasksController.getTaskSubmitted);
        this.router.get('/proffesor/:id_subject/:id_student', tasksController_1.tasksController.getTasksSubmittedSubject);
        this.router.post('/proffesor/checked', tasksController_1.tasksController.taskChecked);
        this.router.get('/subject/:id_task/students', tasksController_1.tasksController.getStudentsAndTasksSubmitted);
        this.router.get('/subjects/:id_student', tasksController_1.tasksController.getSubjectsTasksStudent);
        this.router.get('/submitted/:id_task/:id_student', tasksController_1.tasksController.getTaskSubmittedData);
        this.router.get('/submitted/:id_task/:id_student/:id_submitted', tasksController_1.tasksController.getTaskSubmittedData2);
        this.router.get('/date/:id_task', tasksController_1.tasksController.getTaskDate);
        this.router.put('/date/update', tasksController_1.tasksController.updateTaskDate);
        this.router.get('/prueba', tasksController_1.tasksController.prueba);
    }
}
const tasksRoutes = new TasksRoutes();
exports.default = tasksRoutes.router;
