import {Request, Response } from 'express';
const passportConfig = require('./passPortController');
// const passport = require ('passport');
import passport from 'passport';
import pool from '../database';
import { helpers } from './helpers';

class LoginController {

    public async signup (req: Request, res: Response){ 
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
        }
        
        newUser.password = await helpers.encryptPassword(password);

        const result = await pool.query('INSERT INTO Users SET ?', [newUser]);
        res.json(newUser);
    }

    public async signin(req: Request, res: Response) {
        const { username } = req.body;
        const { password } = req.body;

        const newUser = {
            username,
            password
        }

        

        const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if(rows.length > 0) {
            const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.password);
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
            res.status(401).json({
                message: "Auth failed"
            });
        }

    }
}

export const loginController = new LoginController();