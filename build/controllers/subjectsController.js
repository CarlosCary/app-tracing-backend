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
class SubjectsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjects = yield database_1.default.query("SELECT * FROM subjects");
            res.json(subjects);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id } = req.params;
            // const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
            // if(games.length > 0) {
            //     return res.json(games[0]);
            // }
            // res.status(404).json({text: "not found game"});
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { subject_name } = req.body;
            const { subject_semester } = req.body;
            const { year } = req.body;
            const { id_proffesor } = req.body;
            const subject_code = yield helpers_1.helpers.makeRandomString(5);
            const newSubject = {
                subject_name,
                subject_semester,
                year,
                id_proffesor,
                subject_code,
            };
            const result = yield database_1.default.query('INSERT INTO subjects SET ?', [newSubject]);
            // console.log(result);
            res.json(newSubject);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id } = req.params;
            // await pool.query("UPDATE games set ? WHERE id = ?", [req.body, id]);
            // res.json({text: "the game was updated"});
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { id } = req.params;
            // await pool.query('DELETE FROM games WHERE id = ?', [id]);
            // res.json({text: "the game was deleted"});
        });
    }
    enrolled(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_student } = req.body;
            const { subject_code } = req.body;
            const newSubject = {};
            const subject = yield database_1.default.query('SELECT * FROM subjects WHERE subject_code = ?', [subject_code]);
            const id_subject = subject[0].id_subject;
            const newEnrolled = {
                id_student,
                id_subject,
            };
            const enrolled = yield database_1.default.query('INSERT INTO enrolled_students SET ?', [newEnrolled]);
            res.json(enrolled);
        });
    }
    getStudentsSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_student } = req.params;
            const student = yield database_1.default.query('SELECT * FROM enrolled_students WHERE id_student = ?', [id_student]);
            // if(games.length > 0) {
            //     return res.json(games[0]);
            // }
            return res.json(student);
            // res.status(404).json({text: "not found game"});
        });
    }
    getSubject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_subject } = req.params;
            const subject = yield database_1.default.query('SELECT * FROM subjects WHERE id_subject = ?', [id_subject]);
            // if(games.length > 0) {
            //     return res.json(games[0]);
            // }
            return res.json(subject[0]);
            // res.status(404).json({text: "not found game"});
        });
    }
    getStudentSubjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_student } = req.params;
            const studentSubjects = yield database_1.default.query('SELECT subjects.subject_name, subjects.subject_semester, subjects.year FROM subjects JOIN enrolled_students ON enrolled_students.id_subject=subjects.id_subject WHERE enrolled_students.id_student=?', [id_student]);
            console.log(studentSubjects);
            return res.json(studentSubjects);
            // res.status(404).json({text: "not found game"});
        });
    }
}
exports.subjectsController = new SubjectsController();
