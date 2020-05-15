"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReviewController_1 = require("../controllers/ReviewController");
class FormReviewRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/new', ReviewController_1.reviewController.create);
        this.router.get('/task/:id_submitted_task', ReviewController_1.reviewController.getReviewFormsProffesor);
        this.router.get('/all/:id_proffesor', ReviewController_1.reviewController.getAssignedReviews);
        this.router.get('/student/:id_review', ReviewController_1.reviewController.getAssignedReviewData);
        this.router.get('/proffesors/:id_submitted_task', ReviewController_1.reviewController.getAssignedReviewers);
        this.router.put('/proffesors/update', ReviewController_1.reviewController.updateReview);
        this.router.get('/tutor/:id_proffesor', ReviewController_1.reviewController.getAssignedReviewsTutor);
        this.router.get('/:id_proffesor/:role', ReviewController_1.reviewController.getAssignedReviews2);
    }
}
const formReviewRoutes = new FormReviewRoutes();
exports.default = formReviewRoutes.router;
