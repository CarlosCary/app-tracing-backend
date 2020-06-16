"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formReviewController_1 = require("../controllers/formReviewController");
class FormReviewRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', formReviewController_1.formReviewController.create);
        this.router.get('/all/:id_proffesor', formReviewController_1.formReviewController.getReviewFormsProffesor);
        this.router.get('/:id_form_task', formReviewController_1.formReviewController.getReviewForm);
        this.router.put('/update', formReviewController_1.formReviewController.updateReviewForm);
    }
}
const formReviewRoutes = new FormReviewRoutes();
exports.default = formReviewRoutes.router;
