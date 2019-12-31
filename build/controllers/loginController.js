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
const helpers_1 = require("./helpers");
const StudentModel_1 = __importDefault(require("../models/StudentModel"));
class LoginController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const { username } = req.body;
            // const { password } = req.body;
            // const newUser = {
            //     username,
            //     password
            // }
            // newUser.password = await helpers.encryptPassword(password);
            // const result = await pool.query('INSERT INTO Users SET ?', [newUser]);
            // res.json(newUser);
            const student = new StudentModel_1.default({
                name: req.body.name,
                username: req.body.username,
                password: yield helpers_1.helpers.encryptPassword(req.body.password),
            });
            try {
                const savedStudent = yield student.save();
                res.json(savedStudent);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.body;
            const { password } = req.body;
            /*
            const newUser = {
                username,
                password
            }
    
            
            
            const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    
            if(rows.length > 0) {
                const user = rows[0];
                const validPassword = await helpers.matchPassword(password, user.password);
                console.log("hay el usuario");
                if(validPassword) {
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
                console.log("NO hay el usuario");
                res.status(401).json({
                    message: "Auth failed"
                });
            }
    
            */
            try {
                let user = yield StudentModel_1.default.findOne({ username: req.body.username });
                if (user) {
                    const validPassword = yield helpers_1.helpers.matchPassword(password, user.password);
                    if (validPassword) {
                        res.json({
                            id: user._id,
                            user: user
                        });
                    }
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
}
exports.loginController = new LoginController();
