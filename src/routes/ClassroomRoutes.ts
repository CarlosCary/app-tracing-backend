import { Router } from 'express';

import { classroomController } from '../controllers/ClassroomController';

class ClassroomRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/new', classroomController.create);
        // this.router.get('/:id_proffesor/:id_review', answerReviewController.getAnswerReviewProffesor);
        // this.router.get('/all/:id_review', answerReviewController.getAnswersReviewProffesors);
    }
}

const classroomRoutes = new ClassroomRoutes();
export default classroomRoutes.router;