"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClassroomSchema = new mongoose_1.default.Schema({
    classroom: {
        type: String,
        required: true
    },
    idTaskSubmitted: {
        type: String
    }
});
const ClassroomModel = mongoose_1.default.model('Classroom', ClassroomSchema);
exports.default = ClassroomModel;
