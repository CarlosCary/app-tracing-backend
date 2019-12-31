"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SubjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    idProffesor: {
        type: String,
        required: true
    },
    subjectCode: {
        type: String,
        required: true
    },
    enrolledStudents: {
        type: [String]
    },
});
const SubjectModel = mongoose_1.default.model('Subject', SubjectSchema);
exports.default = SubjectModel;
