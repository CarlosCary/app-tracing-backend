import {Request, Response } from 'express';
const passportConfig = require('./passPortController');

import passport from 'passport';

import { helpers } from '../utils/helpers';
import Student from '../models/StudentModel';
import Proffesor from '../models/ProffesorModel';
import Notifications from '../models/NotificationsModel';
import mongoose from '../database';

class LoginController {

    public async signup (req: Request, res: Response){ 
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            password: await helpers.encryptPassword(req.body.password),
            role: "student"

        })
        
        try {
            const isAccountRegister = await Student.findOne({ email: req.body.email });
            if(isAccountRegister) {
                res.status(401).json({
                    message: "El correo electrónico ya fue registrado"
                });
            }

            const savedStudent = await student.save();
            res.json(savedStudent);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async signin(req: Request, res: Response) {
        const { password } = req.body;
        const { email } = req.body;
        try {  
            let user:any = await Student.findOne({ email: email });
            if(user) {
                
                const validPassword:boolean = await helpers.matchPassword(password, user.password);
                if(validPassword) {
                    res.json({
                        id: user._id, 
                        user: user
                    });
                } 
                else {
                    res.status(401).json({
                        message: "Auth failed",
                        data: {
                            invalidEmail: false,
                            invalidPassword: true
                        }
                    });
                }
            }
            else {
                user = await Proffesor.findOne({ email: email });
                if(user) {
                    const validPassword:boolean = await helpers.matchPassword(password, user.password);
                    if(validPassword) {
                        res.json({
                            id: user._id, 
                            user: user
                        });
                    }
                    return res.status(401).json({
                        message: "Auth failed",
                        data: {
                            invalidEmail: false,
                            invalidPassword: true
                        }
                    });
                } 
                else {
                    return res.status(401).json({
                        message: "Auth failed",
                        data: {
                            invalidEmail: true,
                            invalidPassword: false
                        }
                    });
                }
            }
            
            
            
        } catch (error) {
            res.status(error.httpStatusCode).json({
                message: "Auth Failed",
                data: {
                    invalidEmail: true,
                    invalidPassword: false
                }
            });
        }
    }

    public async getProffesorsList(req: Request, res: Response) {
        const { career } = req.params;
        try {  
            let proffesors:any = await Student.find({ role: 'proffesor' }).select('name');
            res.json(proffesors);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getProffesors(req: Request, res: Response) {
        try {  
            let proffesors:any = await Proffesor.find().select('name email role career');
            res.json(proffesors);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async registerProffesor(req: Request, res: Response) {
        const proffesor = new Proffesor({
            name: req.body.name,
            career: req.body.career,
            role: req.body.role,
            academicDegree: req.body.academicDegree,
            email: req.body.email,
            password: await helpers.encryptPassword(req.body.password),
        })
        
        try {
            const savedProffesor = await proffesor.save();
            const notificationsProffesor = new Notifications({
                idProffesor: savedProffesor._id,
                director: 0,
                rapporteur: 0,
                tutor: 0
            })
            notificationsProffesor.save();
            
            res.json(savedProffesor);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }
    
    public async getProffesor(req: Request, res: Response) {
        //asd
        const { id_proffesor } = req.params;

        try {  
            let proffesor:any = await Proffesor.findById(id_proffesor);
            res.json(proffesor);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async updateProffesor(req: Request, res: Response): Promise<any> {
        const { idProffesor } = req.body;
        const { name } = req.body;
        const { career } = req.body;
        const { role } = req.body;
        const { academicDegree } = req.body;
        

        try {
            const updateProffesor = await Proffesor.findByIdAndUpdate(idProffesor, { name, career, role, academicDegree });
            res.json(updateProffesor);
        }

        catch (error) {
            res.json ({message: error});
        }
    }

    public async getDataAccount(req: Request, res: Response): Promise<any> {
        const { id_account } = req.params;
        
        try {
            const dataAccountProffesor = await Proffesor.findById(id_account).select('-password');
            if(!dataAccountProffesor) {
                const dataAccountStudent = await Student.findById(id_account).select('-password');
                res.json(dataAccountStudent);
            }
            else 
                res.json(dataAccountProffesor);
        }
        catch (error) {
            res.json ({message: error});
        }
    }

    public async updateAccount(req: Request, res: Response): Promise<any> {
        const { idAccount } = req.body;
        const { name } = req.body;
        const { email } = req.body;
        const { role } = req.body;
        
        
        if(role === 'proffesor') {
            try {
                const updateProffesor = await Proffesor.findByIdAndUpdate(idAccount, { name, email });
                res.json(updateProffesor);
            }
            catch (error) {
                res.json ({message: error});
            }
        }
        if(role === 'student') {
            try {
                const updateStudent= await Student.findByIdAndUpdate(idAccount, { name, email });
                res.json(updateStudent);
            }    
            catch (error) {
                res.json ({message: error});
            }
        }
    }

    public async updatePassword(req: Request, res: Response): Promise<any> {
        const { idAccount } = req.body;
        const { currentPassword } = req.body;
        const { newPassword } = req.body;
        const { role } = req.body;
        
        console.log(idAccount);
        console.log(currentPassword);
        console.log(newPassword);
        console.log(role);

        if(role === 'proffesor') {
            try {
                const verifyPassword:any = await Proffesor.findById(idAccount).select('password -_id');
                const validPassword:boolean = await helpers.matchPassword(currentPassword, verifyPassword.password);
                if(validPassword) {
                    const passwordEncripted = await helpers.encryptPassword(newPassword);
                    const updateProffesor = await Proffesor.findByIdAndUpdate(idAccount, {password: passwordEncripted});
                    res.json(updateProffesor);
                }
                else
                    res.status(401).json({message: 'invalid password'});
            }
            catch (error) {
                res.json ({message: error});
            }
        }
        if(role === 'student') {
            try {
                const verifyPassword:any = await Student.findById(idAccount).select('password -_id');
                const validPassword:boolean = await helpers.matchPassword(currentPassword, verifyPassword.password);
                if(validPassword) {
                    const passwordEncripted = await helpers.encryptPassword(newPassword);
                    const updateStudent = await Student.findByIdAndUpdate(idAccount, {password: passwordEncripted});
                    res.json(updateStudent);
                }
                else
                    res.status(401).json({message: 'invalid password'});
                
            }    
            catch (error) {
                res.json ({message: error});
            }
        }
    }
}

export const loginController = new LoginController();