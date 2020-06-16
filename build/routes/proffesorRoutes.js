"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proffesorController_1 = __importDefault(require("../controllers/proffesorController"));
class ProffesorRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/committe/:id_account', proffesorController_1.default.getProffesorsAvaliableCommitte);
        this.router.get('/committe/:id_account/:id_submitted_task', proffesorController_1.default.getProffesorsAvaliableCommitteAndSelected);
        // this.router.post('/new', .create);
    }
}
const proffesorRoutes = new ProffesorRoutes();
exports.default = proffesorRoutes.router;
