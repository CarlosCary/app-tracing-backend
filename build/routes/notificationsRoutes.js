"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationsController_1 = require("../controllers/notificationsController");
class NotificationsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.put('/notify/committee', notificationsController_1.notificationsController.notifyCommittee);
        this.router.get('/proffesors/:id_proffesor', notificationsController_1.notificationsController.getNotifications);
        this.router.put('/proffesors/clear/tutor', notificationsController_1.notificationsController.clearTutorNotifications);
        this.router.put('/proffesors/clear/rapporteur', notificationsController_1.notificationsController.clearRapporteurNotifications);
        this.router.put('/proffesors/clear/all', notificationsController_1.notificationsController.clearAllNotifications);
    }
}
const notificationsRoutes = new NotificationsRoutes();
exports.default = notificationsRoutes.router;
