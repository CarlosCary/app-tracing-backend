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
const SubjectModel_1 = __importDefault(require("../models/SubjectModel"));
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
            const subject = new SubjectModel_1.default({
                name: subject_name,
                semester: subject_semester,
                year: year,
                idProffesor: id_proffesor,
                subjectCode: subject_code,
            });
            try {
                const savedSubject = yield subject.save();
                res.json(savedSubject);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
            // const result = await pool.query('INSERT INTO subjects SET ?', [newSubject]);
            // res.json(newSubject);
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
            try {
                let newEnrolled = yield SubjectModel_1.default.updateOne({ subjectCode: subject_code }, { $push: { enrolledStudents: id_student } });
                res.json(newEnrolled);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getStudentSubjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_student } = req.params;
            const { semester } = req.params;
            const { year } = req.params;
            // const studentSubjects = await pool.query(
            //     'SELECT subjects.subject_name, subjects.subject_semester, subjects.year, subjects.id_subject FROM subjects JOIN enrolled_students ON enrolled_students.id_subject=subjects.id_subject WHERE enrolled_students.id_student=?', [id_student]);
            console.log("que tiene semester");
            console.log(semester);
            if (semester != "null") {
                try {
                    let studentSubjects = yield SubjectModel_1.default.find({ enrolledStudents: id_student })
                        .where('year').equals(year)
                        .where('semester').equals(semester);
                    res.json(studentSubjects);
                }
                catch (error) {
                    res.status(400).json({ message: error });
                }
            }
            else {
                try {
                    let studentSubjects = yield SubjectModel_1.default.find({ enrolledStudents: id_student });
                    res.json(studentSubjects);
                }
                catch (error) {
                    res.status(400).json({ message: error });
                }
            }
            // return res.json(studentSubjects);
            // res.status(404).json({text: "not found game"});
        });
    }
    getProffesorSubjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_proffesor } = req.params;
            try {
                let proffesorSubjects = yield SubjectModel_1.default.find({ idProffesor: id_proffesor });
                res.json(proffesorSubjects);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
}
exports.subjectsController = new SubjectsController();
