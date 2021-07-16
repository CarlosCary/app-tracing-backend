"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
class FormReviewRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', reviewController_1.reviewController.create);
        this.router.post('/new/reviewers', reviewController_1.reviewController.assignReviewers);
        this.router.get('/reviewers/:id_student/:id_proffesor', reviewController_1.reviewController.getReviewersAssigned);
        this.router.get('/reviewers/:id_student', reviewController_1.reviewController.getReviewersAssignedFromStudent);
        this.router.get('/task/:id_submitted_task', reviewController_1.reviewController.getReviewFormsProffesor);
        this.router.get('/all/:id_proffesor', reviewController_1.reviewController.getAssignedReviews);
        this.router.get('/student/:id_review', reviewController_1.reviewController.getAssignedReviewData);
        this.router.get('/proffesors/:id_submitted_task', reviewController_1.reviewController.getAssignedReviewers);
        this.router.put('/proffesors/update', reviewController_1.reviewController.updateReview);
        this.router.put('/reviewers/update', reviewController_1.reviewController.updateReviewers);
        this.router.get('/tutor/:id_proffesor', reviewController_1.reviewController.getAssignedReviewsTutor);
        this.router.get('/:id_proffesor/:role', reviewController_1.reviewController.getAssignedReviews2);
    }
}
const formReviewRoutes = new FormReviewRoutes();
exports.default = formReviewRoutes.router;
