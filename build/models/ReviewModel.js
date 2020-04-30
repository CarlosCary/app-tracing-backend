"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewSchema = new mongoose_1.default.Schema({
    formTittles: {
        type: [String],
        required: true
    },
    formDescriptions: {
        type: [String]
    },
    reviewers: {
        type: [{ idProffesor: String, role: String }],
        required: true
    },
    idProffesor: {
        type: String,
        required: true
    },
    idSubmittedTask: {
        type: String,
        required: true
    }
});
const ReviewModel = mongoose_1.default.model('Review', ReviewSchema);
exports.default = ReviewModel;
