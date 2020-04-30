import { Router } from 'express';

import { notificationsController } from '../controllers/NotificationsController';

class NotificationsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.put('/notify/committee', notificationsController.notifyCommittee);
        this.router.get('/proffesors/:id_proffesor', notificationsController.getNotifications);
        this.router.put('/proffesors/clear/tutor', notificationsController.clearTutorNotifications);
        this.router.put('/proffesors/clear/rapporteur', notificationsController.clearRapporteurNotifications);
        this.router.put('/proffesors/clear/all', notificationsController.clearAllNotifications);
        // this.router.get('/:id_proffesor/:id_review', answerReviewController.getAnswerReviewProffesor);
        // this.router.get('/all/:id_review', answerReviewController.getAnswersReviewProffesors);
    }
}

const notificationsRoutes = new NotificationsRoutes();
export default notificationsRoutes.router;