"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TaskRequestedSchema = new mongoose_1.default.Schema({
    idSubject: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    visibilityDate: {
        type: String,
        required: true
    },
    students: {
        type: [String]
    },
    documentsRequested: {
        type: [String]
    },
    formRequested: {
        tittleForm: [String],
        descriptionForm: [String]
    },
});
const TaskRequestedModel = mongoose_1.default.model('Task', TaskRequestedSchema);
exports.default = TaskRequestedModel;
