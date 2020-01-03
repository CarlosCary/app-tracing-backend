import {Request, Response } from 'express';
import pool from '../database';
import { helpers } from './helpers';
import Subject from '../models/SubjectModel';

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

        const subject = new Subject({
            name: subject_name,
            semester: subject_semester,
            year: year,
            idProffesor: id_proffesor,
            subjectCode: subject_code,
        })
        
        try {
            const savedSubject = await subject.save();
            res.json(savedSubject);
        } catch (error) {
            res.status(400).json({message: error });
        }
        // const result = await pool.query('INSERT INTO subjects SET ?', [newSubject]);
        // res.json(newSubject);
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
        try {  
            let newEnrolled:any = await Subject.updateOne({ subjectCode: subject_code }, { $push: {enrolledStudents: id_student}});
            res.json(newEnrolled);
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }
    
    public async getStudentSubjects (req: Request, res: Response): Promise<any> { 
        const { id_student } = req.params;
        const { semester } = req.params;
        const { year } = req.params;
        // const studentSubjects = await pool.query(
        //     'SELECT subjects.subject_name, subjects.subject_semester, subjects.year, subjects.id_subject FROM subjects JOIN enrolled_students ON enrolled_students.id_subject=subjects.id_subject WHERE enrolled_students.id_student=?', [id_student]);
        console.log("que tiene semester");
        console.log(semester);
        if(semester != "null") {
            try {  
                let studentSubjects:any = await Subject.find({ enrolledStudents: id_student })
                                                        .where('year').equals(year)
                                                        .where('semester').equals(semester);
                res.json(studentSubjects);
                
            } catch (error) {
                res.status(400).json({message: error });
            }
        }
        else {
            try {  
                let studentSubjects:any = await Subject.find({ enrolledStudents: id_student });
                res.json(studentSubjects);
                
            } catch (error) {
                res.status(400).json({message: error });
            }
        }
    
        // return res.json(studentSubjects);
        // res.status(404).json({text: "not found game"});
    }

    public async getProffesorSubjects(req: Request, res: Response): Promise<any> { 
        const { id_proffesor } = req.params;

        try {  
            let proffesorSubjects:any = await Subject.find({ idProffesor: id_proffesor });
            res.json(proffesorSubjects);
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }
}

export const subjectsController = new SubjectsController();