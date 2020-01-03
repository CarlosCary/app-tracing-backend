"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSubmittedSchema = new mongoose_1.default.Schema({
    idTask: {
        type: String,
        required: true
    },
    idStudent: {
        type: String,
        required: true
    },
    documents: {}
});
const TaskSubmittedModel = mongoose_1.default.model('TaskSubmitted', TaskSubmittedSchema);
exports.default = TaskSubmittedModel;
