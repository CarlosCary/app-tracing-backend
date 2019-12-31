import {Request, Response } from 'express';
const passportConfig = require('./passPortController');
// const passport = require ('passport');
import passport from 'passport';
import pool from '../database';
import { helpers } from './helpers';
import Student from '../models/StudentModel';

class LoginController {

    public async signup (req: Request, res: Response){ 
        
        // const { username } = req.body;
        // const { password } = req.body;

        // const newUser = {
        //     username,
        //     password
        // }
        
        // newUser.password = await helpers.encryptPassword(password);

        // const result = await pool.query('INSERT INTO Users SET ?', [newUser]);
        // res.json(newUser);

        const student = new Student({
            name: req.body.name,
            username: req.body.username,
            password: await helpers.encryptPassword(req.body.password),
        })
        
        try {
            const savedStudent = await student.save();
            res.json(savedStudent);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async signin(req: Request, res: Response) {
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
            let user:any = await Student.findOne({ username: req.body.username });
            if(user) {
                const validPassword:boolean = await helpers.matchPassword(password, user.password);
                if(validPassword) {
                    res.json({
                        id: user._id, 
                        user: user
                    });
                }
            }
            res.status(401).json({
                message: "Auth failed"
            });
            
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }
}

export const loginController = new LoginController();