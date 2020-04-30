"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FormReviewSchema = new mongoose_1.default.Schema({
    formTittle: {
        type: String,
        required: true
    },
    formDescription: {
        type: String
    },
    tittles: {
        type: [String],
        required: true
    },
    descriptions: {
        type: [String],
        requered: true
    },
    idProffesor: {
        type: String,
        required: true
    }
});
const FormReviewModel = mongoose_1.default.model('FormReview', FormReviewSchema);
exports.default = FormReviewModel;
