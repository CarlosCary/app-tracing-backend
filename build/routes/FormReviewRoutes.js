"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FormReviewController_1 = require("../controllers/FormReviewController");
class FormReviewRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', FormReviewController_1.formReviewController.create);
        this.router.get('/all/:id_proffesor', FormReviewController_1.formReviewController.getReviewFormsProffesor);
        this.router.get('/:id_form_task', FormReviewController_1.formReviewController.getReviewForm);
        this.router.put('/update', FormReviewController_1.formReviewController.updateReviewForm);
    }
}
const formReviewRoutes = new FormReviewRoutes();
exports.default = formReviewRoutes.router;
