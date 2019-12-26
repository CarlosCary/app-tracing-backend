import {Request, Response } from 'express';
import pool from '../database';
import { helpers } from './helpers';

class SubjectsController {

    public async list (req: Request, res: Response){ 
        const subjects = await pool.query("SELECT * FROM subjects");
        res.json(subjects);
    }

    
    public async getOne (req: Request, res: Response): Promise<any>{ 
        // const { id } = req.params;
        // const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        // if(games.length > 0) {
        //     return res.json(games[0]);
        // }
        
        // res.status(404).json({text: "not found game"});
    }

    public async create (req: Request, res: Response): Promise<void>{
        const { subject_name } = req.body;
        const { subject_semester } = req.body;
        const { year } = req.body;
        const { id_proffesor } = req.body;
        const subject_code = await helpers.makeRandomString(5);

        const newSubject = {
            subject_name,
            subject_semester,
            year,
            id_proffesor,
            subject_code,
        }

        const result = await pool.query('INSERT INTO subjects SET ?', [newSubject]);
        // console.log(result);
        res.json(newSubject);
    }

    public async update (req: Request, res: Response) {
        // const { id } = req.params;
        // await pool.query("UPDATE games set ? WHERE id = ?", [req.body, id]);
        // res.json({text: "the game was updated"});
    }

    public async delete (req: Request, res: Response): Promise<void>{
        // const { id } = req.params;
        // await pool.query('DELETE FROM games WHERE id = ?', [id]);
        // res.json({text: "the game was deleted"});
    }

    public async enrolled(req: Request, res: Response): Promise<void> {
        const { id_student } = req.body;
        const { subject_code } = req.body;
        
        const subject = await pool.query('SELECT * FROM subjects WHERE subject_code = ?', [subject_code]);
        const id_subject = subject[0].id_subject;
        
        const newEnrolled = {
            id_student,
            id_subject,
        }

        const enrolled = await pool.query('INSERT INTO enrolled_students SET ?', [newEnrolled]);

        res.json(enrolled);
    }

    public async getStudentsSubject (req: Request, res: Response): Promise<any>{ 
        const { id_student } = req.params;
        const student = await pool.query('SELECT * FROM enrolled_students WHERE id_student = ?', [id_student]);
        // if(games.length > 0) {
        //     return res.json(games[0]);
        // }
        return res.json(student);
        // res.status(404).json({text: "not found game"});
    } 

    //QUIZAS NO SIRVE REVISAR DESPUES PARA LIMPIAR EL CODIGO
    public async getSubject (req: Request, res: Response): Promise<any>{ 
        const { id_subject } = req.params;
        const subject = await pool.query('SELECT * FROM subjects WHERE id_subject = ?', [id_subject]);
        // if(games.length > 0) {
        //     return res.json(games[0]);
        // }
        return res.json(subject[0]);
        // res.status(404).json({text: "not found game"});
    }
    
    public async getStudentSubjects (req: Request, res: Response): Promise<any> { 
        const { id_student } = req.params;
        const studentSubjects = await pool.query(
            'SELECT subjects.subject_name, subjects.subject_semester, subjects.year, subjects.id_subject FROM subjects JOIN enrolled_students ON enrolled_students.id_subject=subjects.id_subject WHERE enrolled_students.id_student=?', [id_student]);
        
        return res.json(studentSubjects);
        // res.status(404).json({text: "not found game"});
    }
}

export const subjectsController = new SubjectsController();