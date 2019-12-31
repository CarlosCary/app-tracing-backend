"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const helpers_1 = require("./helpers");
const TaskRequestedModel_1 = __importDefault(require("../models/TaskRequestedModel"));
const SubjectModel_1 = __importDefault(require("../models/SubjectModel"));
class TasksController {
    getOneTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO
        });
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskName } = req.body;
            const { idSubject } = req.body;
            const { deadline } = req.body;
            const { visibilityDate } = req.body;
            const { documentsRequested } = req.body;
            const { formTittles } = req.body;
            const { formDescriptions } = req.body;
            const form = { tittleForm: formTittles, descriptionForm: formDescriptions };
            //this gets studentsId array and id of subject, we need just studentsId Array
            const studentsId = yield SubjectModel_1.default.where('_id').gte(idSubject).select('enrolledStudents');
            const task = new TaskRequestedModel_1.default({
                idSubject: idSubject,
                name: taskName,
                deadline: deadline,
                visibilityDate: visibilityDate,
                students: studentsId[0].enrolledStudents,
                documentsRequested: documentsRequested,
                formRequested: form
            });
            try {
                const savedTask = yield task.save();
                res.json(savedTask);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: error });
            }
        });
    }
    addDocumentTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documentName } = req.body;
            const { idTask } = req.body;
            const newDocument = {
                document_name: documentName,
                id_task: idTask,
            };
            const result = yield database_1.default.query('INSERT INTO document_requested SET ?', [newDocument]);
            res.json(result);
        });
    }
    addFormTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { formTittle } = req.body;
            const { formDesciption } = req.body;
            const { idTask } = req.body;
            const newForm = {
                form_tittle: formTittle,
                form_description: formDesciption,
                id_task: idTask,
            };
            const result = yield database_1.default.query('INSERT INTO form_task SET ?', [newForm]);
            res.json(result);
        });
    }
    addTaskStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idStudent } = req.body;
            const { idTask } = req.body;
            const newTaskStudent = {
                id_student: idStudent,
                id_task: idTask
            };
            const result = yield database_1.default.query('INSERT INTO students_tasks SET ?', [newTaskStudent]);
            res.json(result);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO
        });
    }
    assignTaskAllStudentsSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_subject } = req.body;
            const { id_task } = req.body;
            const studentsIds = yield database_1.default.query('SELECT enrolled_students.id_student FROM enrolled_students WHERE enrolled_students.id_subject = ?', [id_subject]);
            let newTaskManyStudents = [];
            for (let i = 0; i < studentsIds.length; i++) {
                newTaskManyStudents.push([id_task, studentsIds[i].id_student]);
            }
            const taskStudents = yield database_1.default.query('INSERT INTO students_tasks (id_task, id_student) VALUES ?', [newTaskManyStudents]);
            res.json(taskStudents);
        });
    }
    getAllTaskStudentAvaliable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let todayDate = helpers_1.helpers.getDateToday();
            const { id_student } = req.params;
            try {
                const studentTasks = yield TaskRequestedModel_1.default.where('students').gte(id_student);
                res.json(studentTasks);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: error });
            }
            // const studentsTasks = await pool.query( 'SELECT * FROM subject_task JOIN students_tasks ON students_tasks.id_task=subject_task.id_task WHERE students_tasks.id_student=? and subject_task.deadline>?', [id_student, todayDate]);
            // res.json(studentsTasks);
        });
    }
    getFormRequestedTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_task } = req.params;
            try {
                const formTask = yield TaskRequestedModel_1.default.where('_id').gte(id_task);
                console.log(formTask);
                res.json(formTask);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: error });
            }
        });
    }
}
exports.tasksController = new TasksController();
