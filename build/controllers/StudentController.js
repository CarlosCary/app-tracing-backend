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
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const games = yield database_1.default.query('SELECT * FROM games WHERE id = ?', [id]);
            if (games.length > 0) {
                return res.json(games[0]);
            }
            res.status(404).json({ text: "not found game" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // await pool.query('INSERT INTO games set ?', [req.body]);
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
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE games set ? WHERE id = ?", [req.body, id]);
            res.json({ text: "the game was updated" });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM games WHERE id = ?', [id]);
            res.json({ text: "the game was deleted" });
        });
    }
}
const studentController = new StudentController();
exports.default = studentController;
