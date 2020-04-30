import { Router } from 'express';

import { formReviewController } from '../controllers/FormReviewController';

class FormReviewRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/new', formReviewController.create);
        this.router.get('/all/:id_proffesor', formReviewController.getReviewFormsProffesor);
        this.router.get('/:id_form_task', formReviewController.getReviewForm);
        this.router.put('/update', formReviewController.updateReviewForm);
    }
}

const formReviewRoutes = new FormReviewRoutes();
export default formReviewRoutes.router;