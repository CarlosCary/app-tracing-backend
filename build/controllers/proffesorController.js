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
const ProffesorModel_1 = __importDefault(require("../models/ProffesorModel"));
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
class ProffesorController {
    getProffesorsAvaliableCommitte(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { career } = req.params;
            const { id_account } = req.params;
            try {
                const proffesorCareer = yield ProffesorModel_1.default.findById(id_account).select('career -_id');
                const career = proffesorCareer.career;
                const proffesors = yield ProffesorModel_1.default.find()
                    .where({ role: 'proffesor' })
                    .where({ career: career })
                    .select('name');
                const director = yield ProffesorModel_1.default.find()
                    .where({ role: 'director' })
                    .where({ career: career })
                    .select('name');
                res.json({ proffesors, director });
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    getProffesorsAvaliableCommitteAndSelected(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { career } = req.params;
            const { id_account } = req.params;
            const { id_submitted_task } = req.params;
            try {
                const proffesorCareer = yield ProffesorModel_1.default.findById(id_account).select('career -_id');
                const career = proffesorCareer.career;
                const proffesors = yield ProffesorModel_1.default.find()
                    .where({ role: 'proffesor' })
                    .where({ career: career })
                    .select('name');
                const director = yield ProffesorModel_1.default.find()
                    .where({ role: 'director' })
                    .where({ career: career })
                    .select('name');
                const idProffesorsSelected = yield ReviewModel_1.default.findOne({ idSubmittedTask: id_submitted_task })
                    .select('reviewers ');
                res.json({ proffesors, director,
                    committe: idProffesorsSelected,
                    idReview: idProffesorsSelected._id });
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
}
const proffesorController = new ProffesorController();
exports.default = proffesorController;
