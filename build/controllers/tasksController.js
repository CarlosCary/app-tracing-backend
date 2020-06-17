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
const helpers_1 = require("../utils/helpers");
const TaskRequestedModel_1 = __importDefault(require("../models/TaskRequestedModel"));
const SubjectModel_1 = __importDefault(require("../models/SubjectModel"));
const TaskSubmitted_1 = __importDefault(require("../models/TaskSubmitted"));
const StudentModel_1 = __importDefault(require("../models/StudentModel"));
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
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
            const studentsId = yield SubjectModel_1.default.findById(idSubject).select('enrolledStudents -_id');
            const mailStudents = yield StudentModel_1.default.find({ _id: {
                    $in: studentsId.enrolledStudents
                } }).select('email -_id');
            let destinationEmails = [];
            for (let i = 0; i < mailStudents.length; i++) {
                destinationEmails.push(mailStudents[i].email);
            }
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                //Configurar en el server
                // host: process.env.HOST_MAIL_SERVICE,
                // port: process.env.PORT_MAIL_SERVICE,
                auth: {
                    user: process.env.USER_MAIL_SERVICE,
                    pass: process.env.PASSWORD_MAIL_SERVICE
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const message = {
                from: "'Universidad Católica Boliviana Sistema de Revisión de documentos' <doc.reviewer@gmail.com>",
                to: destinationEmails,
                subject: 'Documento asignado para revisar',
                html: `<h2>Asignación de tribunal</h2>
                    <p>
                        ¡Hola!, se le ha asignado una nueva tarea.
                    </p>
                    <p>
                        Por favor ingrese al sistema de revisión de documentos académicos.
                    </p>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Ucatolica2.jpg/360px-Ucatolica2.jpg">
                    ` // Plain text body
            };
            //DESCOMENTAR CUANDO ESTE EN EL SERVER 
            // transporter.sendMail(message, function(err:any, info:any) {
            //     if (err) {
            //         res.json({message: err});
            //     } 
            //     else {
            //         res.json({message: info});
            //     }
            // });
            const task = new TaskRequestedModel_1.default({
                idSubject: idSubject,
                name: taskName,
                //save date in MMDDYYYY format
                deadline: helpers_1.helpers.changeDateFormatDDMMYYYtoMMDDYYYY(deadline),
                visibilityDate: helpers_1.helpers.changeDateFormatDDMMYYYtoMMDDYYYY(visibilityDate),
                students: studentsId.enrolledStudents,
                documentsRequested: documentsRequested,
                formRequested: form,
                state: "undelivered"
            });
            try {
                const savedTask = yield task.save();
                res.json(savedTask);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //TODO
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
                res.status(400).json({ message: error });
            }
        });
    }
    getFormRequestedTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_task } = req.params;
            try {
                // const taskSubmittedData:any = await TaskSubmitted.find({id_task: id_task});
                const formTask = yield TaskRequestedModel_1.default.findById(id_task);
                res.json(formTask);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getTaskSubmittedData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_task } = req.params;
            const { id_student } = req.params;
            try {
                const formTask = yield TaskRequestedModel_1.default.findById(id_task);
                const taskSubmittedData = yield TaskSubmitted_1.default.find({ idTask: id_task,
                    idStudent: id_student });
                let idsTaskSubmitteds = [];
                for (let i = 0; i < taskSubmittedData.length; i++) {
                    idsTaskSubmitteds.push(taskSubmittedData[i]._id);
                }
                const studentName = yield StudentModel_1.default.findById(taskSubmittedData[0].idStudent).select('name -_id');
                const reviews = yield ReviewModel_1.default.find({ idSubmittedTask: {
                        $in: idsTaskSubmitteds
                    } })
                    .select('idSubmittedTask');
                let idsReviewAssigned = [];
                let isReviewFound;
                for (let i = 0; i < taskSubmittedData.length; i++) {
                    isReviewFound = false;
                    for (let j = 0; j < reviews.length; j++) {
                        if (String(taskSubmittedData[i]._id) === reviews[j].idSubmittedTask) {
                            idsReviewAssigned.push(reviews[j]._id);
                            isReviewFound = true;
                            break;
                        }
                    }
                    if (!isReviewFound)
                        idsReviewAssigned.push(null);
                }
                taskSubmittedData[0].author = studentName.name;
                res.json({ formTask, taskSubmittedData: taskSubmittedData,
                    author: studentName.name, idsReviewAssigned });
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getTaskSubmittedData2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_task } = req.params;
            const { id_student } = req.params;
            const { id_submitted } = req.params;
            try {
                const formTask = yield TaskRequestedModel_1.default.findById(id_task);
                const taskSubmittedData = yield TaskSubmitted_1.default.findById(id_submitted);
                const studentName = yield StudentModel_1.default.findById(taskSubmittedData.idStudent).select('name -_id');
                taskSubmittedData.author = studentName.name;
                res.json({ formTask, taskSubmittedData: taskSubmittedData, author: studentName.name });
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
            const { idSubject } = req.body;
            const documents = req.files;
            const dateSend = helpers_1.helpers.getDateToday();
            let paths = [];
            documents.map(function (document) {
                paths.push(document.path);
            });
            const taskSubmitted = new TaskSubmitted_1.default({
                idTask: idTask,
                idStudent: idStudent,
                idSubject: idSubject,
                documents: paths,
                state: "none",
                dateSend: dateSend,
                dateModify: dateSend
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
                let taskSubmitted = yield TaskSubmitted_1.default.findById(id_task);
                let studentName = yield StudentModel_1.default.findById(taskSubmitted.idStudent).select('name -_id');
                res.json({ taskSubmitted: taskSubmitted, author: studentName });
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
            let tasksName = [];
            try {
                let tasksSubmitted = yield TaskSubmitted_1.default.find({ idSubject: id_subject,
                    idStudent: id_student })
                    .select('-documents -dateModify');
                for (let i = 0; i < tasksSubmitted.length; i++) {
                    let task = yield TaskRequestedModel_1.default.findById(tasksSubmitted[i].idTask);
                    tasksName.push(task.name);
                }
                res.json({ tasksName, tasksSubmitted });
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
                const proffesorTasks = yield TaskRequestedModel_1.default.find({ idSubject: {
                        $in: subjectsId
                    } });
                //change format date to Bolivia
                for (let i = 0; i < proffesorTasks.length; i++) {
                    proffesorTasks[i].deadline = helpers_1.helpers.changeDateFormatDDMMYYYtoMMDDYYYY(proffesorTasks[i].deadline);
                    proffesorTasks[i].visibilityDate = helpers_1.helpers.changeDateFormatDDMMYYYtoMMDDYYYY(proffesorTasks[i].visibilityDate);
                }
                res.json(proffesorTasks);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getStudentsAndTasksSubmitted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_task } = req.params;
            let studentsTasks = [];
            try {
                const taskData = yield TaskRequestedModel_1.default.findById(id_task);
                const studentsSubject = yield SubjectModel_1.default.findById(taskData.idSubject).
                    select('enrolledStudents -_id');
                const studentsData = yield StudentModel_1.default.find({ _id: {
                        $in: studentsSubject.enrolledStudents
                    } }).
                    select('name');
                const tasksSubmitted = yield TaskSubmitted_1.default.find({ idStudent: {
                        $in: studentsSubject.enrolledStudents
                    },
                    idTask: id_task
                });
                let isTaskSubmitted;
                for (let i = 0; i < studentsData.length; i++) {
                    isTaskSubmitted = false;
                    for (let j = 0; j < tasksSubmitted.length; j++) {
                        if (studentsData[i]._id == tasksSubmitted[j].idStudent) {
                            isTaskSubmitted = true;
                            const reviewAssigned = yield ReviewModel_1.default.find({ idSubmittedTask: tasksSubmitted[j]._id });
                            //Devolvera true si hay revisores asignados y false si no existen revisores en el campo 'reviewAssigned'
                            studentsTasks.push({ student: studentsData[i], taskSubmitted: tasksSubmitted[j], reviewAssigned: reviewAssigned != 0 });
                        }
                    }
                    if (!isTaskSubmitted)
                        studentsTasks.push({ student: studentsData[i], taskSubmitted: null });
                }
                res.json(studentsTasks);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getSubjectsTasksStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_student } = req.params;
            let tasksSubjects = [];
            const dateToday = helpers_1.helpers.getDateTodayEngFormat();
            try {
                let subjectsData = yield SubjectModel_1.default.find({ enrolledStudents: id_student });
                for (let i = 0; i < subjectsData.length; i++) {
                    let tasksSubject = yield TaskRequestedModel_1.default.find({ idSubject: subjectsData[i]._id,
                        // deadline: {$gte: dateToday},
                        visibilityDate: { $lte: dateToday }
                    });
                    for (let j = 0; j < tasksSubject.length; j++) {
                        tasksSubject[j].deadline = helpers_1.helpers.changeDateFormatDDMMYYYtoMMDDYYYY(tasksSubject[j].deadline);
                        tasksSubject[j].visibilityDate = helpers_1.helpers.changeDateFormatDDMMYYYtoMMDDYYYY(tasksSubject[j].visibilityDate);
                    }
                    tasksSubjects.push({ subject: subjectsData[i], tasksSubject: tasksSubject });
                }
                res.json(tasksSubjects);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    getTaskDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_task } = req.params;
            try {
                let subjectsData = yield TaskRequestedModel_1.default.findById(id_task).select('deadline -_id');
                res.json(subjectsData);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    updateTaskDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTask } = req.body;
            const { deadline } = req.body;
            const newDeadline = { deadline };
            try {
                const updateFormTask = yield TaskRequestedModel_1.default.findByIdAndUpdate(idTask, newDeadline);
                res.json(updateFormTask);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
}
exports.tasksController = new TasksController();
