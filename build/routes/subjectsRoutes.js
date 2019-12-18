"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subjectsController_1 = require("../controllers/subjectsController");
class SubjectsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', subjectsController_1.subjectsController.create);
        this.router.get('/', subjectsController_1.subjectsController.list);
        this.router.post('/new/enrolled', subjectsController_1.subjectsController.enrolled);
        this.router.get('/student/:id_student', subjectsController_1.subjectsController.getStudentSubjects);
        this.router.get('/:id_subject', subjectsController_1.subjectsController.getSubject);
    }
}
const subjectsRoutes = new SubjectsRoutes();
exports.default = subjectsRoutes.router;
