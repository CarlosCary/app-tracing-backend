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
exports.classroomController = void 0;
const AnswerReviewModel_1 = __importDefault(require("../models/AnswerReviewModel"));
const StudentModel_1 = __importDefault(require("../models/StudentModel"));
const ClassroomModel_1 = __importDefault(require("../models/ClassroomModel"));
class ClassroomController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { classroom } = req.body;
            const { idTaskSubmitted } = req.body;
            const classroomCode = new ClassroomModel_1.default({
                classroom,
                idTaskSubmitted,
            });
            try {
                const savedclassroomCode = yield classroomCode.save();
                res.json(savedclassroomCode);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getAnswersReviewProffesors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_review } = req.params;
            let answersProffesorsData = [];
            try {
                const answersReviewProffesors = yield AnswerReviewModel_1.default.find({ idReview: id_review });
                for (let i = 0; i < answersReviewProffesors.length; i++) {
                    const proffesorName = yield StudentModel_1.default.findById(answersReviewProffesors[i].idProffesor)
                        .select('name -_id');
                    let answersProffesor = [];
                    for (let j = 0; j < answersReviewProffesors[i].tittlesForm.length; j++) {
                        answersProffesor.push({ tittle: answersReviewProffesors[i].tittlesForm[j],
                            answer: answersReviewProffesors[i].feedBackAnswers[j] });
                    }
                    answersProffesorsData.push({ proffesorName: proffesorName.name, answersProffesor });
                }
                res.json(answersProffesorsData);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
}
exports.classroomController = new ClassroomController();
