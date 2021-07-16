import { Router } from 'express';

import { reviewController } from '../controllers/reviewController';

class FormReviewRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/new', reviewController.create);
        this.router.post('/new/reviewers', reviewController.assignReviewers);
        this.router.get('/reviewers/:id_student/:id_proffesor', reviewController.getReviewersAssigned);
        this.router.get('/reviewers/:id_student', reviewController.getReviewersAssignedFromStudent);
        this.router.get('/task/:id_submitted_task', reviewController.getReviewFormsProffesor);
        this.router.get('/all/:id_proffesor', reviewController.getAssignedReviews);
        this.router.get('/student/:id_review', reviewController.getAssignedReviewData);
        this.router.get('/proffesors/:id_submitted_task', reviewController.getAssignedReviewers);
        this.router.put('/proffesors/update', reviewController.updateReview);
        this.router.put('/reviewers/update', reviewController.updateReviewers);
        this.router.get('/tutor/:id_proffesor', reviewController.getAssignedReviewsTutor);
        this.router.get('/:id_proffesor/:role', reviewController.getAssignedReviews2);
        
    }
}

const formReviewRoutes = new FormReviewRoutes();
export default formReviewRoutes.router;
