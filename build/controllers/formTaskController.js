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
exports.formTaskController = void 0;
const FormTaskModel_1 = __importDefault(require("../models/FormTaskModel"));
class FormTaskController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { formTittle } = req.body;
            const { tittles } = req.body;
            const { descriptions } = req.body;
            const { idProffesor } = req.body;
            const formTask = new FormTaskModel_1.default({
                formTittle,
                tittles,
                descriptions,
                idProffesor
            });
            try {
                const savedFormTask = yield formTask.save();
                res.json(savedFormTask);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getFormsTasksProffesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_proffesor } = req.params;
            try {
                const formsTasksProffesor = yield FormTaskModel_1.default.find({ idProffesor: id_proffesor });
                res.json(formsTasksProffesor);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    getFormTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_form_task } = req.params;
            try {
                const formTask = yield FormTaskModel_1.default.findById(id_form_task);
                res.json(formTask);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    updateFormTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idTaskForm } = req.body;
            const { formTittle } = req.body;
            const { formDescription } = req.body;
            const { tittles } = req.body;
            const { descriptions } = req.body;
            try {
                const updateFormTask = yield FormTaskModel_1.default.findByIdAndUpdate(idTaskForm, {
                    formTittle: formTittle,
                    formDescription: formDescription,
                    tittles: tittles,
                    descriptions: descriptions
                });
                res.json(updateFormTask);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
}
exports.formTaskController = new FormTaskController();
