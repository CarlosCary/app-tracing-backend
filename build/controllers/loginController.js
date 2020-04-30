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
const helpers_1 = require("../utils/helpers");
const StudentModel_1 = __importDefault(require("../models/StudentModel"));
const ProffesorModel_1 = __importDefault(require("../models/ProffesorModel"));
const NotificationsModel_1 = __importDefault(require("../models/NotificationsModel"));
class LoginController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = new StudentModel_1.default({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: yield helpers_1.helpers.encryptPassword(req.body.password),
                role: "student"
            });
            try {
                const savedStudent = yield student.save();
                console.log(savedStudent);
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
            const { email } = req.body;
            try {
                let user = yield StudentModel_1.default.findOne({ username: username });
                if (user) {
                    const validPassword = yield helpers_1.helpers.matchPassword(password, user.password);
                    if (validPassword) {
                        res.json({
                            id: user._id,
                            user: user
                        });
                    }
                    else {
                        res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                }
                else {
                    user = yield ProffesorModel_1.default.findOne({ email: email });
                    if (user) {
                        const validPassword = yield helpers_1.helpers.matchPassword(password, user.password);
                        if (validPassword) {
                            res.json({
                                id: user._id,
                                user: user
                            });
                        }
                    }
                    else {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                }
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getProffesorsList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { career } = req.params;
            try {
                let proffesors = yield StudentModel_1.default.find({ role: 'proffesor' }).select('name');
                res.json(proffesors);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getProffesors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let proffesors = yield ProffesorModel_1.default.find().select('name email role career');
                res.json(proffesors);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    registerProffesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const proffesor = new ProffesorModel_1.default({
                name: req.body.name,
                career: req.body.career,
                role: req.body.role,
                academicDegree: req.body.academicDegree,
                email: req.body.email,
                password: yield helpers_1.helpers.encryptPassword(req.body.password),
            });
            try {
                const savedProffesor = yield proffesor.save();
                const notificationsProffesor = new NotificationsModel_1.default({
                    idProffesor: savedProffesor._id,
                    director: 0,
                    rapporteur: 0,
                    tutor: 0
                });
                notificationsProffesor.save();
                res.json(savedProffesor);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getProffesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //asd
            const { id_proffesor } = req.params;
            try {
                let proffesor = yield ProffesorModel_1.default.findById(id_proffesor);
                res.json(proffesor);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    updateProffesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProffesor } = req.body;
            const { name } = req.body;
            const { career } = req.body;
            const { role } = req.body;
            const { academicDegree } = req.body;
            try {
                const updateProffesor = yield ProffesorModel_1.default.findByIdAndUpdate(idProffesor, { name, career, role, academicDegree });
                res.json(updateProffesor);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    getDataAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_account } = req.params;
            try {
                const dataAccountProffesor = yield ProffesorModel_1.default.findById(id_account).select('-password');
                if (!dataAccountProffesor) {
                    const dataAccountStudent = yield StudentModel_1.default.findById(id_account).select('-password');
                    res.json(dataAccountStudent);
                }
                else
                    res.json(dataAccountProffesor);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    updateAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idAccount } = req.body;
            const { name } = req.body;
            const { email } = req.body;
            const { role } = req.body;
            if (role === 'proffesor') {
                try {
                    const updateProffesor = yield ProffesorModel_1.default.findByIdAndUpdate(idAccount, { name, email });
                    res.json(updateProffesor);
                }
                catch (error) {
                    res.json({ message: error });
                }
            }
            if (role === 'student') {
                try {
                    const updateStudent = yield StudentModel_1.default.findByIdAndUpdate(idAccount, { name, email });
                    res.json(updateStudent);
                }
                catch (error) {
                    res.json({ message: error });
                }
            }
        });
    }
    updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idAccount } = req.body;
            const { currentPassword } = req.body;
            const { newPassword } = req.body;
            const { role } = req.body;
            console.log(idAccount);
            console.log(currentPassword);
            console.log(newPassword);
            console.log(role);
            if (role === 'proffesor') {
                try {
                    const verifyPassword = yield ProffesorModel_1.default.findById(idAccount).select('password -_id');
                    const validPassword = yield helpers_1.helpers.matchPassword(currentPassword, verifyPassword.password);
                    if (validPassword) {
                        const passwordEncripted = yield helpers_1.helpers.encryptPassword(newPassword);
                        const updateProffesor = yield ProffesorModel_1.default.findByIdAndUpdate(idAccount, { password: passwordEncripted });
                        res.json(updateProffesor);
                    }
                    else
                        res.status(401).json({ message: 'invalid password' });
                }
                catch (error) {
                    res.json({ message: error });
                }
            }
            if (role === 'student') {
                try {
                    const verifyPassword = yield StudentModel_1.default.findById(idAccount).select('password -_id');
                    const validPassword = yield helpers_1.helpers.matchPassword(currentPassword, verifyPassword.password);
                    if (validPassword) {
                        const passwordEncripted = yield helpers_1.helpers.encryptPassword(newPassword);
                        const updateStudent = yield StudentModel_1.default.findByIdAndUpdate(idAccount, { password: passwordEncripted });
                        res.json(updateStudent);
                    }
                    else
                        res.status(401).json({ message: 'invalid password' });
                }
                catch (error) {
                    res.json({ message: error });
                }
            }
        });
    }
}
exports.loginController = new LoginController();
