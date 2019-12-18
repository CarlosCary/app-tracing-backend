"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passportConfig = require('./passPortController');
const database_1 = __importDefault(require("../database"));
const helpers_1 = require("./helpers");
class LoginController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // passport.authenticate('local.signup', {
            //     successMessage: "registro exitoso",
            //     failureMessage: "no se pudo registrar",
            //     failureFlash: true,
            // });
            ///
            const { username } = req.body;
            const { password } = req.body;
            const newUser = {
                username,
                password
            };
            newUser.password = yield helpers_1.helpers.encryptPassword(password);
            const result = yield database_1.default.query('INSERT INTO Users SET ?', [newUser]);
            res.json(newUser);
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            const { password } = req.body;
            const newUser = {
                username,
                password
            };
            const rows = yield database_1.default.query('SELECT * FROM users WHERE username = ?', [username]);
            if (rows.length > 0) {
                const user = rows[0];
                const validPassword = yield helpers_1.helpers.matchPassword(password, user.password);
                if (validPassword) {
                    //TODO: jsonwebtoken to manage permissions
                    return res.status(200).json({
                        message: "Auth successful",
                        id: rows[0].id,
                        user: rows[0]
                    });
                }
                else {
                    res.status(401).json({
                        message: "Auth failed"
                    });
                }
            }
            else {
                res.status(401).json({
                    message: "Auth failed"
                });
            }
        });
    }
}
exports.loginController = new LoginController();
