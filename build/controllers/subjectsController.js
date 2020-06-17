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
const SubjectModel_1 = __importDefault(require("../models/SubjectModel"));
const StudentModel_1 = __importDefault(require("../models/StudentModel"));
class SubjectsController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    enrolled(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_student } = req.body;
            const { subject_code } = req.body;
            try {
                let isStudentEnrolled = yield SubjectModel_1.default.find({ subjectCode: subject_code, enrolledStudents: id_student });
                if (isStudentEnrolled.length)
                    res.status(400).json({ message: "Ya esta inscrito a esta materia" });
                let newEnrolled = yield SubjectModel_1.default.updateOne({ subjectCode: subject_code }, { $push: { enrolledStudents: id_student } });
                if (newEnrolled.nModified > 0)
                    res.json(newEnrolled);
                else {
                    res.status(400).json({ message: "Código incorrecto" });
                }
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
        });
    }
    getProffesorSubjects2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_proffesor } = req.params;
            const { semester } = req.params;
            const { year } = req.params;
            if (semester != "null") {
                try {
                    let studentSubjects = yield SubjectModel_1.default.find({ idProffesor: id_proffesor })
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
                    let proffesorSubjects = yield SubjectModel_1.default.find({ idProffesor: id_proffesor });
                    res.json(proffesorSubjects);
                }
                catch (error) {
                    res.status(400).json({ message: error });
                }
            }
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
    getEnrolledStudentsData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_subject } = req.params;
            try {
                let studentsEnrolled = yield SubjectModel_1.default.find({ _id: id_subject })
                    .select('enrolledStudents');
                let studentsEnrolledData = yield StudentModel_1.default.find({ _id: {
                        $in: studentsEnrolled[0].enrolledStudents
                    } });
                res.json(studentsEnrolledData);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
}
exports.subjectsController = new SubjectsController();
