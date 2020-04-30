"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AnswerReviewSchema = new mongoose_1.default.Schema({
    tittlesForm: {
        type: [String],
        required: true
    },
    feedBackAnswers: {
        type: [String]
    },
    idProffesor: {
        type: String,
        required: true
    },
    idReview: {
        type: String,
        required: true
    }
});
const AnswerReviewModel = mongoose_1.default.model('AnswerReview', AnswerReviewSchema);
exports.default = AnswerReviewModel;
