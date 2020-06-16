"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SubjectsController_1 = require("../controllers/SubjectsController");
class SubjectsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', SubjectsController_1.subjectsController.create);
        this.router.get('/', SubjectsController_1.subjectsController.list);
        this.router.post('/new/enrolled', SubjectsController_1.subjectsController.enrolled);
        this.router.get('/student/:id_student/:semester/:year', SubjectsController_1.subjectsController.getStudentSubjects);
        this.router.get('/proffesor/:id_proffesor/:semester/:year', SubjectsController_1.subjectsController.getProffesorSubjects2);
        this.router.get('/proffesor/:id_proffesor', SubjectsController_1.subjectsController.getProffesorSubjects);
        this.router.get('/enrolled/:id_subject', SubjectsController_1.subjectsController.getEnrolledStudentsData);
    }
}
const subjectsRoutes = new SubjectsRoutes();
exports.default = subjectsRoutes.router;
