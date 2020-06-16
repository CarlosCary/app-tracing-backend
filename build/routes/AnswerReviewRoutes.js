"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answerReviewController_1 = require("../controllers/answerReviewController");
class AnswerReviewRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', answerReviewController_1.answerReviewController.create);
        // this.router.get('/:id_proffesor/:id_review', answerReviewController.getAnswerReviewProffesor);
        this.router.get('/all/:id_review', answerReviewController_1.answerReviewController.getAnswersReviewProffesors);
    }
}
const answerReviewRoutes = new AnswerReviewRoutes();
exports.default = answerReviewRoutes.router;
