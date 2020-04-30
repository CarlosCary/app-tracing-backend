"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NotificationsController_1 = require("../controllers/NotificationsController");
class NotificationsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/notify/committee', NotificationsController_1.notificationsController.notifyCommittee);
        this.router.get('/proffesors/:id_proffesor', NotificationsController_1.notificationsController.getNotifications);
        this.router.put('/proffesors/clear/tutor', NotificationsController_1.notificationsController.clearTutorNotifications);
        this.router.put('/proffesors/clear/rapporteur', NotificationsController_1.notificationsController.clearRapporteurNotifications);
        this.router.put('/proffesors/clear/all', NotificationsController_1.notificationsController.clearAllNotifications);
        // this.router.get('/:id_proffesor/:id_review', answerReviewController.getAnswerReviewProffesor);
        // this.router.get('/all/:id_review', answerReviewController.getAnswersReviewProffesors);
    }
}
const notificationsRoutes = new NotificationsRoutes();
exports.default = notificationsRoutes.router;
