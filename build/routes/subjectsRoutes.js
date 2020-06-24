"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subjectsController_1 = require("../controllers/subjectsController");
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
class SubjectsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', subjectsController_1.subjectsController.create);
        this.router.get('/', subjectsController_1.subjectsController.list);
        this.router.post('/new/enrolled', subjectsController_1.subjectsController.enrolled);
        this.router.get('/student/:id_student/:semester/:year', subjectsController_1.subjectsController.getStudentSubjects);
        this.router.get('/proffesor/:id_proffesor/:semester/:year', subjectsController_1.subjectsController.getProffesorSubjects2);
        this.router.get('/proffesor/:id_proffesor', subjectsController_1.subjectsController.getProffesorSubjects);
        this.router.get('/enrolled/:id_subject', subjectsController_1.subjectsController.getEnrolledStudentsData);
        this.router.post('/document/new', upload.array("fileDocument", 12), subjectsController_1.subjectsController.addDocument);
        this.router.get('/files/:id_subject', subjectsController_1.subjectsController.getSubjectFiles);
        this.router.delete('/file/delete/:id_file', subjectsController_1.subjectsController.deleteFile);
    }
}
const subjectsRoutes = new SubjectsRoutes();
exports.default = subjectsRoutes.router;
