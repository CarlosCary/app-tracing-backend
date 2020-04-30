"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FormTaskSchema = new mongoose_1.default.Schema({
    formTittle: {
        type: String,
        required: true
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
const FormTaskModel = mongoose_1.default.model('FormTask', FormTaskSchema);
exports.default = FormTaskModel;
