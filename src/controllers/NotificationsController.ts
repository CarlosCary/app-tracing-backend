import {Request, Response } from 'express';
import AnswerReview from '../models/AnswerReviewModel';
import Student from '../models/StudentModel';
import Notifications from '../models/NotificationsModel';
import Proffesor from '../models/ProffesorModel';
import nodemailer from 'nodemailer';

import 'dotenv/config';

class NotificationsController {

    public async getNotifications (req: Request, res: Response): Promise<void>{
        const { id_proffesor } = req.params;
        

        
        try {
            const proffesorNotifications = await Notifications.findOne({idProffesor: id_proffesor});
            res.json(proffesorNotifications);

        } catch (error) {
            res.status(400).json({message: error });
        }
    }
   
    public async notifyCommittee(req: Request, res: Response): Promise<any> {
        const { director } = req.body;
        const { rapporteur } = req.body;
        const { tutor } = req.body;
        
        const mailStudents:any = await Proffesor.find({_id: {
                                                    $in: [director, rapporteur, tutor]
                                                }}).select('email -_id')

        let destinationEmails = [];
        for(let i = 0; i < mailStudents.length; i ++) {
            destinationEmails.push(mailStudents[i].email);
        }
        console.log(destinationEmails);
        const transporter = nodemailer.createTransport({
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
            from: "'Universidad Católica Boliviana Sistema de Revisión de documentos' <doc.reviewer@gmail.com>", // Sender address
            to: destinationEmails,         // recipients
            subject: 'Documento asignado para revisar', // Subject line
            html: `<h2>Asignación de tribunal</h2>
                    <p>
                        ¡Hola!, se le ha asignado un documento para revisar como parte de un tribunal.
                    </p>
                    <p>
                        Por favor ingrese al sistema de revisión de documentos académicos.
                    </p>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Ucatolica2.jpg/360px-Ucatolica2.jpg">
                    ` // Plain text body
        }
        
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
            let idProffesor = {idProffesor: director};
            const updateDirectorNotification = await Notifications.findOneAndUpdate(idProffesor, 
                                                                                    { 
                                                                                        $inc: {director: 1}
                                                                                    });
            idProffesor = {idProffesor: rapporteur};
            const updateRapporteurNotification = await Notifications.findOneAndUpdate(idProffesor, 
                                                                                    { 
                                                                                        $inc: {rapporteur: 1}
                                                                                    });
            idProffesor = {idProffesor: tutor};
            const updateTutorteurNotification = await Notifications.findOneAndUpdate(idProffesor, 
                                                                                    { 
                                                                                        $inc: {tutor: 1}
                                                                                    });
            res.json({updateDirectorNotification, updateRapporteurNotification, updateTutorteurNotification});
        }

        catch (error) {
            res.json ({message: error});
        }
        
    }

    public async clearTutorNotifications(req: Request, res: Response): Promise<any> {
        const { idProffesor } = req.body;
        
        try {
            
            const updateTutorNotification = await Notifications.findOneAndUpdate({idProffesor: idProffesor}, {tutor: 0});
            
            res.json(updateTutorNotification);
        }

        catch (error) {
            res.json ({message: error});
        }
    }

    public async clearRapporteurNotifications(req: Request, res: Response): Promise<any> {
        const { idProffesor } = req.body;
        
        try {
            const updateRapporteurNotification = await Notifications.findOneAndUpdate({idProffesor: idProffesor}, {rapporteur: 0});
            console.log(updateRapporteurNotification);
            res.json(updateRapporteurNotification);
        }

        catch (error) {
            res.json ({message: error});
        }
    }

    public async clearAllNotifications(req: Request, res: Response): Promise<any> {
        const { idProffesor } = req.body;
        
        try {
            const updaterNotifications = await Notifications.findOneAndUpdate({idProffesor: idProffesor}, 
                                                                                {
                                                                                    tutor: 0,
                                                                                    rapporteur: 0,
                                                                                    director: 0
                                                                                });
            res.json(updaterNotifications);
        }

        catch (error) {
            res.json ({message: error});
        }
    }
    
}

export const notificationsController = new NotificationsController();