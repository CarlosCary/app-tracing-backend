import { Router } from 'express';

import { notificationsController } from '../controllers/notificationsController';

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
    }
}

const notificationsRoutes = new NotificationsRoutes();
export default notificationsRoutes.router;
