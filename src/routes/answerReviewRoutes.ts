import { Router } from 'express';

import { answerReviewController } from '../controllers/answerReviewController';

class AnswerReviewRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/new', answerReviewController.create);
        // this.router.get('/:id_proffesor/:id_review', answerReviewController.getAnswerReviewProffesor);
        this.router.get('/all/:id_review', answerReviewController.getAnswersReviewProffesors);
    }
}

const answerReviewRoutes = new AnswerReviewRoutes();
export default answerReviewRoutes.router;
