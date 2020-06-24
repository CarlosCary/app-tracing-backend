"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SubjectFileSchema = new mongoose_1.default.Schema({
    idSubject: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    path: {}
});
const SubjectFileModel = mongoose_1.default.model('SubjectFile', SubjectFileSchema);
exports.default = SubjectFileModel;
