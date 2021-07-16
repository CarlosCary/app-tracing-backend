"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewersSchema = new mongoose_1.default.Schema({
    reviewers: {
        type: [{ idProffesor: String, role: String }],
        required: true
    },
    idProffesor: {
        type: String,
        required: true
    },
    idStudent: {
        type: String,
        required: true
    }
});
const ReviewersModel = mongoose_1.default.model('Reviewers', ReviewersSchema);
exports.default = ReviewersModel;
