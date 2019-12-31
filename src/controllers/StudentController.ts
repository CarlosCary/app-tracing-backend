import {Request, Response } from 'express';
import pool from '../database';
import Student from '../models/StudentModel';

class StudentController {

    public async list (req: Request, res: Response) {
        try {
            const students = await Student.find();
            res.json(students);
        } catch(error) {
            res.json({message:error});
        }
    }

    
    public async getOne (req: Request, res: Response): Promise<any>{ 
        const { id } = req.params;
        const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        if(games.length > 0) {
            return res.json(games[0]);
        }
        
        res.status(404).json({text: "not found game"});
    }

    public async create (req: Request, res: Response): Promise<void>{
        // await pool.query('INSERT INTO games set ?', [req.body]);
        console.log(req.body);
        const student = new Student({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        })

        
        try {
            const savedStudent = await student.save();
            res.json(savedStudent);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async update (req: Request, res: Response) {
        const { id } = req.params;
        await pool.query("UPDATE games set ? WHERE id = ?", [req.body, id]);
        res.json({text: "the game was updated"});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('DELETE FROM games WHERE id = ?', [id]);
        res.json({text: "the game was deleted"});
    }
}

const studentController = new StudentController();
export default studentController;