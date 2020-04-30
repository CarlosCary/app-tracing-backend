import {Request, Response } from 'express';
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

    public async create (req: Request, res: Response): Promise<void>{
        
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

}

const studentController = new StudentController();
export default studentController;