"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AnswerReviewController_1 = require("../controllers/AnswerReviewController");
class AnswerReviewRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', AnswerReviewController_1.answerReviewController.create);
        // this.router.get('/:id_proffesor/:id_review', answerReviewController.getAnswerReviewProffesor);
        this.router.get('/all/:id_review', AnswerReviewController_1.answerReviewController.getAnswersReviewProffesors);
    }
}
const answerReviewRoutes = new AnswerReviewRoutes();
exports.default = answerReviewRoutes.router;
