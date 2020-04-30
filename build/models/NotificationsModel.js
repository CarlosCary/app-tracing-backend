"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationsSchema = new mongoose_1.default.Schema({
    idProffesor: {
        type: String,
        required: true
    },
    director: {
        type: Number
    },
    rapporteur: {
        type: Number
    },
    tutor: {
        type: Number
    }
});
const ClassroomModel = mongoose_1.default.model('Notifications', NotificationsSchema);
exports.default = ClassroomModel;
