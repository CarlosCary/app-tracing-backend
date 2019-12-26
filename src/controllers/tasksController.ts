import {Request, Response } from 'express';
import pool from '../database';
import { helpers } from './helpers';

class TasksController {

    public async list (req: Request, res: Response){ 
        // const subjects = await pool.query("SELECT * FROM subjects");
        // res.json(subjects);
    }

    
    public async getOne (req: Request, res: Response): Promise<any>{ 
        // const { id } = req.params;
        // const games = await pool.query('SELECT * FROM games WHERE id = ?', [id]);
        // if(games.length > 0) {
        //     return res.json(games[0]);
        // }
        
        // res.status(404).json({text: "not found game"});
    }

    public async createTask (req: Request, res: Response): Promise<void>{
        const { taskName } = req.body;
        const { idSubject } = req.body;
        const { deadline } = req.body;
        const { visibilityDate } = req.body;

        const newTask = {
            task_name: taskName,
            id_subject: idSubject,
            deadline,
            visibility_date: visibilityDate,
        }

        const result = await pool.query('INSERT INTO subject_task SET ?', [newTask]);
        res.json(result.insertId);
    }

    public async addDocumentTask (req: Request, res: Response): Promise<void>{
        const { documentName } = req.body;
        const { idTask } = req.body;

        const newDocument = {
            document_name: documentName,
            id_task: idTask,
        }

        const result = await pool.query('INSERT INTO document_requested SET ?', [newDocument]);
        
        res.json(result);
    }

    public async addFormTask (req: Request, res: Response): Promise<void>{
        const { formTittle } = req.body;
        const { formDesciption } = req.body;
        const { idTask } = req.body;

        const newForm = {
            form_tittle: formTittle,
            form_description: formDesciption,
            id_task: idTask,
        }

        const result = await pool.query('INSERT INTO form_task SET ?', [newForm]);
        
        res.json(result);
    }
    
    public async addTaskStudent (req: Request, res: Response): Promise<void>{
        const { idStudent } = req.body;
        const { idTask } = req.body;

        const newTaskStudent = {
            id_student: idStudent,
            id_task: idTask
        }

        const result = await pool.query('INSERT INTO students_tasks SET ?', [newTaskStudent]);
        
        res.json(result);
    }

    public async delete (req: Request, res: Response): Promise<void>{
        // const { id } = req.params;
        // await pool.query('DELETE FROM games WHERE id = ?', [id]);
        // res.json({text: "the game was deleted"});
    }

    public async assignTaskAllStudentsSubject (req: Request, res: Response): Promise<any> { 
        const { id_subject } = req.body;
        const { id_task } = req.body;
        const studentsIds = await pool.query(
            'SELECT enrolled_students.id_student FROM enrolled_students WHERE enrolled_students.id_subject = ?', [id_subject]);
        
        
        let newTaskManyStudents = [];

        for(let i = 0; i < studentsIds.length; i ++) {
            newTaskManyStudents.push( [id_task, studentsIds[i].id_student] );
        }

        const taskStudents = await pool.query('INSERT INTO students_tasks (id_task, id_student) VALUES ?', [newTaskManyStudents]);
        res.json(taskStudents);
        
    }

    public async getAllTaskStudentAvaliable(req: Request, res: Response): Promise<any> { 
        let todayDate = helpers.getDateToday();
        const { id_student } = req.params;
        const studentsTasks = await pool.query( 'SELECT * FROM subject_task JOIN students_tasks ON students_tasks.id_task=subject_task.id_task WHERE students_tasks.id_student=? and subject_task.deadline>?', [id_student, todayDate]);
        res.json(studentsTasks);
    }
}

export const tasksController = new TasksController();