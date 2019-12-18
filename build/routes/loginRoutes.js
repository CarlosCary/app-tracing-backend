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
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
