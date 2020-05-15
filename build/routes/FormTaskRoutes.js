"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FormTaskController_1 = require("../controllers/formTaskController");
class FormTaskRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', FormTaskController_1.formTaskController.create);
        this.router.get('/all/:id_proffesor', FormTaskController_1.formTaskController.getFormsTasksProffesor);
        this.router.get('/:id_form_task', FormTaskController_1.formTaskController.getFormTask);
        this.router.put('/update', FormTaskController_1.formTaskController.updateFormTask);
    }
}
const formTaskRoutes = new FormTaskRoutes();
exports.default = formTaskRoutes.router;
