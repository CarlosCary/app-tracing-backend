"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProffesorSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    career: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    academicDegree: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
const ProffesorModel = mongoose_1.default.model('Proffesor', ProffesorSchema);
exports.default = ProffesorModel;
