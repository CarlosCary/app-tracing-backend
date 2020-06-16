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
const FormReviewModel_1 = __importDefault(require("../models/FormReviewModel"));
class FormReviewController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { formTittle } = req.body;
            const { formDescription } = req.body;
            const { tittles } = req.body;
            const { descriptions } = req.body;
            const { idProffesor } = req.body;
            const formReview = new FormReviewModel_1.default({
                formTittle,
                formDescription,
                tittles,
                descriptions,
                idProffesor
            });
            try {
                const savedFormReview = yield formReview.save();
                res.json(savedFormReview);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getReviewFormsProffesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_proffesor } = req.params;
            try {
                const formsReviewProffesor = yield FormReviewModel_1.default.find({ idProffesor: id_proffesor });
                res.json(formsReviewProffesor);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    getReviewForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_form_task } = req.params;
            try {
                const reviewForm = yield FormReviewModel_1.default.findById(id_form_task);
                res.json(reviewForm);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    updateReviewForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idReviewForm } = req.body;
            const { formTittle } = req.body;
            const { formDescription } = req.body;
            const { tittles } = req.body;
            const { descriptions } = req.body;
            try {
                const updateReviewForm = yield FormReviewModel_1.default.findByIdAndUpdate(idReviewForm, {
                    formTittle: formTittle,
                    formDescription: formDescription,
                    tittles: tittles,
                    descriptions: descriptions
                });
                res.json(updateReviewForm);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
}
exports.formReviewController = new FormReviewController();
