import {Request, Response } from 'express';
import pool from '../database';
import { helpers } from './helpers';
import Task from '../models/TaskRequestedModel';
import Subject from '../models/SubjectModel';
import TaskSubmitted from '../models/TaskSubmitted';
// import multer from 'multer';

// const upload = multer({dest: 'upload/'});

class TasksController {
    
    public async getOneTask (req: Request, res: Response): Promise<any>{ 
        //TODO
    }

    public async createTask (req: Request, res: Response): Promise<void>{
        const { taskName } = req.body;
        const { idSubject } = req.body;
        const { deadline } = req.body;
        const { visibilityDate } = req.body;
        const { documentsRequested } = req.body;
        const { formTittles } = req.body;
        const { formDescriptions } = req.body;
        const form = { tittleForm: formTittles, descriptionForm: formDescriptions}
        //this gets studentsId array and id of subject, we need just studentsId Array
        const studentsId = await Subject.where('_id').gte(idSubject).select('enrolledStudents');

        const task = new Task({
            idSubject: idSubject,
            name: taskName,
            deadline: deadline,
            visibilityDate: visibilityDate,
            students: studentsId[0].enrolledStudents,
            documentsRequested: documentsRequested,
            formRequested: form,
            state: "undelivered"
        })

        try {
            const savedTask = await task.save();
            res.json(savedTask);
        } catch (error) {
            console.log(error);
            res.status(400).json({message: error });
        }
    }

    public async addDocumentTask (req: Request, res: Response): Promise<void>{
        //TODO
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
        //TODO
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

    public async getAllTaskStudentAvaliable (req: Request, res: Response): Promise<any> { 
        let todayDate = helpers.getDateToday();
        const { id_student } = req.params;
        try {
            const studentTasks = await Task.where('students').gte(id_student);
            res.json(studentTasks);
        } catch (error) {
            console.log(error);
            res.status(400).json({message: error });
        } 
    }

    public async getFormRequestedTask(req: Request, res: Response): Promise<any> { 
        const { id_task } = req.params;

        try {
            const formTask = await Task.where('_id').gte(id_task);
            res.json(formTask);
        } catch (error) {
            res.status(400).json({message: error });
        } 
    }
    
    public async sendTask (req: Request, res: Response) { 
        const { idTask } = req.body;
        const { idStudent } = req.body;
        const documents = req.files;
        let paths = [];

        documents.map(function(document) {
            paths.push(document.path);
        });

        const taskSubmitted = new TaskSubmitted ({
            idTask: idTask,
            idStudent: idStudent,
            documents: paths,
            state: "none"
        });
        
        try {
            const savedTaskSubmitted = await taskSubmitted.save();
            res.json(savedTaskSubmitted);

        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getTaskSubmitted (req: Request, res: Response) { 
        const { id_task } = req.params;

        try {  
            let taskSubmitted:any = await TaskSubmitted.find({ idTask: id_task });
            res.json(taskSubmitted);
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getTasksSubmittedSubject (req: Request, res: Response) { 
        const { id_subject } = req.params;
        const { id_student } = req.params;

        try {  
            let assignedTask:any = await Task.find({ idSubject: id_subject ,
                                                    students: id_student});
            // console.log(assignedTask);

            let tasksSubmitted = [];

            for(let i = 0; i < assignedTask.length; i ++) {
                const taskSubmitted = await TaskSubmitted.find({idTask: assignedTask[i]._id});
                tasksSubmitted.push(taskSubmitted[0]);
            }
            
            const tasksAssignedAndSubmitted = {assignedTask, tasksSubmitted};
            
            res.json(tasksAssignedAndSubmitted);
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async taskChecked (req: Request, res: Response) { 
        const {idTaskSubmitted} = req.body;
        const {taskSubmittedState} = req.body;
        const {taskCheckedDescription} = req.body;
        
        try {  
            let taskChecked:any = await TaskSubmitted.findByIdAndUpdate(idTaskSubmitted,
                                                    {state: taskSubmittedState, 
                                                    descriptionChecked: taskCheckedDescription});
            res.json(taskChecked);
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getAllTaskProffesorAvaliable (req: Request, res: Response): Promise<any> { 
        let todayDate = helpers.getDateToday();
        const { id_proffesor } = req.params;
        try {
            const proffesorSubjects = await Subject.find().where('idProffesor').equals(id_proffesor);
            
            let subjectsId:any = [];

            proffesorSubjects.forEach(subject => {
                subjectsId.push(subject._id);
            })
            console.log(subjectsId);

            const proffesorTasks:any = await Task.find({idSubject: 
                {
                    $in: subjectsId
                }});
            res.json(proffesorTasks);
        } catch (error) {
            console.log(error);
            res.status(400).json({message: error });
        } 
    }
}

export const tasksController = new TasksController();