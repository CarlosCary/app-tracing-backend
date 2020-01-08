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
const TaskSubmitted_1 = __importDefault(require("../models/TaskSubmitted"));
// import multer from 'multer';
// const upload = multer({dest: 'upload/'});
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
                formRequested: form,
                state: "undelivered"
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
            //TODO
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
        });
    }
    getFormRequestedTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_task } = req.params;
            try {
                const formTask = yield TaskRequestedModel_1.default.where('_id').gte(id_task);
                res.json(formTask);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    sendTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTask } = req.body;
            const { idStudent } = req.body;
            const documents = req.files;
            let paths = [];
            documents.map(function (document) {
                paths.push(document.path);
            });
            const taskSubmitted = new TaskSubmitted_1.default({
                idTask: idTask,
                idStudent: idStudent,
                documents: paths,
                state: "none"
            });
            try {
                const savedTaskSubmitted = yield taskSubmitted.save();
                res.json(savedTaskSubmitted);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getTaskSubmitted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_task } = req.params;
            try {
                let taskSubmitted = yield TaskSubmitted_1.default.find({ idTask: id_task });
                res.json(taskSubmitted);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getTasksSubmittedSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_subject } = req.params;
            const { id_student } = req.params;
            try {
                let assignedTask = yield TaskRequestedModel_1.default.find({ idSubject: id_subject,
                    students: id_student });
                // console.log(assignedTask);
                let tasksSubmitted = [];
                for (let i = 0; i < assignedTask.length; i++) {
                    const taskSubmitted = yield TaskSubmitted_1.default.find({ idTask: assignedTask[i]._id });
                    tasksSubmitted.push(taskSubmitted[0]);
                }
                const tasksAssignedAndSubmitted = { assignedTask, tasksSubmitted };
                res.json(tasksAssignedAndSubmitted);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    taskChecked(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTaskSubmitted } = req.body;
            const { taskSubmittedState } = req.body;
            const { taskCheckedDescription } = req.body;
            try {
                let taskChecked = yield TaskSubmitted_1.default.findByIdAndUpdate(idTaskSubmitted, { state: taskSubmittedState,
                    descriptionChecked: taskCheckedDescription });
                res.json(taskChecked);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getAllTaskProffesorAvaliable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let todayDate = helpers_1.helpers.getDateToday();
            const { id_proffesor } = req.params;
            try {
                const proffesorSubjects = yield SubjectModel_1.default.find().where('idProffesor').equals(id_proffesor);
                let subjectsId = [];
                proffesorSubjects.forEach(subject => {
                    subjectsId.push(subject._id);
                });
                console.log(subjectsId);
                const proffesorTasks = yield TaskRequestedModel_1.default.find({ idSubject: {
                        $in: subjectsId
                    } });
                res.json(proffesorTasks);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: error });
            }
        });
    }
}
exports.tasksController = new TasksController();
