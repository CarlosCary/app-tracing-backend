"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formTaskController_1 = require("../controllers/formTaskController");
class FormTaskRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', formTaskController_1.formTaskController.create);
        this.router.get('/all/:id_proffesor', formTaskController_1.formTaskController.getFormsTasksProffesor);
        this.router.get('/:id_form_task', formTaskController_1.formTaskController.getFormTask);
        this.router.put('/update', formTaskController_1.formTaskController.updateFormTask);
    }
}
const formTaskRoutes = new FormTaskRoutes();
exports.default = formTaskRoutes.router;
