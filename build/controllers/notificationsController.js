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
exports.notificationsController = void 0;
const NotificationsModel_1 = __importDefault(require("../models/NotificationsModel"));
const ProffesorModel_1 = __importDefault(require("../models/ProffesorModel"));
const ReviewersModel_1 = __importDefault(require("../models/ReviewersModel"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
class NotificationsController {
    getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_proffesor } = req.params;
            try {
                const proffesorNotifications = yield NotificationsModel_1.default.findOne({ idProffesor: id_proffesor });
                res.json(proffesorNotifications);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    notifyCommittee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idStudent } = req.body;
            let director;
            let rapporteur;
            let tutor;
            const reviewersData = yield ReviewersModel_1.default.findOne({ idStudent: idStudent })
                .select("reviewers -_id");
            director = reviewersData.reviewers[0].idProffesor;
            rapporteur = reviewersData.reviewers[1].idProffesor;
            tutor = reviewersData.reviewers[2].idProffesor;
            const proffesorsEmail = yield ProffesorModel_1.default.find({ _id: {
                    $in: [director, rapporteur, tutor]
                } }).select('email -_id');
            let destinationEmails = [];
            for (let i = 0; i < proffesorsEmail.length; i++) {
                destinationEmails.push(proffesorsEmail[i].email);
            }
            const transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                //Configurar en el server
                // host: process.env.HOST_MAIL_SERVICE,
                // port: process.env.PORT_MAIL_SERVICE,
                auth: {
                    user: process.env.USER_MAIL_SERVICE,
                    pass: process.env.PASSWORD_MAIL_SERVICE
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            const message = {
                from: "'Universidad Católica Boliviana Sistema de Revisión de documentos' <doc.reviewer@gmail.com>",
                to: destinationEmails,
                subject: 'Documento asignado para revisar',
                html: `<h2>Asignación de tribunal</h2>
                    <p>
                        ¡Hola!, se le ha asignado un documento para revisar como parte de un tribunal.
                    </p>
                    <p>
                        Por favor ingrese al sistema de revisión de documentos académicos.
                    </p>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Ucatolica2.jpg/360px-Ucatolica2.jpg">
                    ` // Plain text body
            };
            //DESCOMENTAR CUANDO ESTE EN EL SERVER 
            // transporter.sendMail(message, function(err:any, info:any) {
            //     if (err) {
            //         res.json({message: err});
            //     } 
            //     else {
            //         res.json({message: info});
            //     }
            // });
            try {
                let idProffesor = { idProffesor: director };
                const updateDirectorNotification = yield NotificationsModel_1.default.findOneAndUpdate(idProffesor, {
                    $inc: { director: 1 }
                });
                idProffesor = { idProffesor: rapporteur };
                const updateRapporteurNotification = yield NotificationsModel_1.default.findOneAndUpdate(idProffesor, {
                    $inc: { rapporteur: 1 }
                });
                idProffesor = { idProffesor: tutor };
                const updateTutorteurNotification = yield NotificationsModel_1.default.findOneAndUpdate(idProffesor, {
                    $inc: { tutor: 1 }
                });
                res.json({ updateDirectorNotification, updateRapporteurNotification, updateTutorteurNotification });
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    clearTutorNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProffesor } = req.body;
            try {
                const updateTutorNotification = yield NotificationsModel_1.default.findOneAndUpdate({ idProffesor: idProffesor }, { tutor: 0 });
                res.json(updateTutorNotification);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    clearRapporteurNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProffesor } = req.body;
            try {
                const updateRapporteurNotification = yield NotificationsModel_1.default.findOneAndUpdate({ idProffesor: idProffesor }, { rapporteur: 0 });
                res.json(updateRapporteurNotification);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    clearAllNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProffesor } = req.body;
            try {
                const updaterNotifications = yield NotificationsModel_1.default.findOneAndUpdate({ idProffesor: idProffesor }, {
                    tutor: 0,
                    rapporteur: 0,
                    director: 0
                });
                res.json(updaterNotifications);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
}
exports.notificationsController = new NotificationsController();
