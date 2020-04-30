"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
class LoginRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/signup', loginController_1.loginController.signup);
        this.router.post('/signin', loginController_1.loginController.signin);
        this.router.post('/proffesor/new', loginController_1.loginController.registerProffesor);
        this.router.get('/proffesor/all', loginController_1.loginController.getProffesors);
        this.router.get('/proffesor/:id_proffesor', loginController_1.loginController.getProffesor);
        this.router.put('/proffesor/update', loginController_1.loginController.updateProffesor);
        this.router.get('/account/:id_account', loginController_1.loginController.getDataAccount);
        this.router.put('/account/update', loginController_1.loginController.updateAccount);
        this.router.put('/account/update/password', loginController_1.loginController.updatePassword);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
