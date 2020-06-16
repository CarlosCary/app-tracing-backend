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
const StudentModel_1 = __importDefault(require("../models/StudentModel"));
class StudentController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield StudentModel_1.default.find();
                res.json(students);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const student = new StudentModel_1.default({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
            });
            try {
                const savedStudent = yield student.save();
                res.json(savedStudent);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
}
const studentController = new StudentController();
exports.default = studentController;
