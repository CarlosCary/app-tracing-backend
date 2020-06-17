import {Request, Response } from 'express';
import { helpers } from '../utils/helpers';
import Task from '../models/TaskRequestedModel';
import Subject from '../models/SubjectModel';
import TaskSubmitted from '../models/TaskSubmitted';
import Student from '../models/StudentModel';
import Review from '../models/ReviewModel';

import nodemailer from 'nodemailer';

import 'dotenv/config';
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
        const studentsId:any = await Subject.findById(idSubject).select('enrolledStudents -_id');
        
        const mailStudents:any = await Student.find({_id: {
                                                    $in: studentsId.enrolledStudents
                                                }}).select('email -_id')

        let destinationEmails = [];
        for(let i = 0; i < mailStudents.length; i ++) {
            destinationEmails.push(mailStudents[i].email);
        }

        
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
                        ¡Hola!, se le ha asignado una nueva tarea.
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

        const task = new Task({
            idSubject: idSubject,
            name: taskName,
            //save date in MMDDYYYY format
            deadline: helpers.changeDateFormatDDMMYYYtoMMDDYYYY(deadline),
            visibilityDate: helpers.changeDateFormatDDMMYYYtoMMDDYYYY(visibilityDate),
            students: studentsId.enrolledStudents,
            documentsRequested: documentsRequested,
            formRequested: form,
            state: "undelivered"
        })

        try {
            const savedTask = await task.save();
            res.json(savedTask);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async delete (req: Request, res: Response): Promise<void>{
        //TODO
    }

    public async getAllTaskStudentAvaliable (req: Request, res: Response): Promise<any> { 
        let todayDate = helpers.getDateToday();
        const { id_student } = req.params;
        try {
            const studentTasks = await Task.where('students').gte(id_student);
            res.json(studentTasks);
        } catch (error) {
            res.status(400).json({message: error });
        } 
    }

    public async getFormRequestedTask(req: Request, res: Response): Promise<any> { 
        const { id_task } = req.params;

        try {
            // const taskSubmittedData:any = await TaskSubmitted.find({id_task: id_task});
            const formTask = await Task.findById(id_task);
            res.json(formTask);
        } catch (error) {
            res.status(400).json({message: error });
        } 
    }
    
    public async getTaskSubmittedData(req: Request, res: Response): Promise<any> {
        const { id_task } = req.params;
        const { id_student } = req.params;
        
        try {
            
            const formTask = await Task.findById(id_task);
            const taskSubmittedData:any = await TaskSubmitted.find({idTask: id_task,
                                                                    idStudent: id_student});
            let idsTaskSubmitteds = [];
            
            for(let i = 0; i < taskSubmittedData.length; i ++) {
                idsTaskSubmitteds.push(taskSubmittedData[i]._id);
            }
            
            const studentName:any = await Student.findById(taskSubmittedData[0].idStudent).select('name -_id');
            
            const reviews:any = await Review.find({idSubmittedTask: 
                                                {
                                                    $in: idsTaskSubmitteds
                                                }})
                                            .select('idSubmittedTask');

            let idsReviewAssigned = [];
            let isReviewFound:boolean;
            for(let i = 0; i < taskSubmittedData.length; i ++) {
                isReviewFound = false;
                for(let j = 0; j < reviews.length; j ++) {
                    
                    if(String(taskSubmittedData[i]._id) === reviews[j].idSubmittedTask) {
                        idsReviewAssigned.push(reviews[j]._id);
                        isReviewFound = true;
                        break;
                    }
                }
                if(!isReviewFound)
                    idsReviewAssigned.push(null);
            }

            taskSubmittedData[0].author = studentName.name;
            res.json({formTask, taskSubmittedData: taskSubmittedData, 
                        author: studentName.name, idsReviewAssigned});
        } catch (error) {
            res.status(400).json({message: error });
        } 
    }

    public async getTaskSubmittedData2(req: Request, res: Response): Promise<any> {
        
        const { id_task } = req.params;
        const { id_student } = req.params;
        const { id_submitted } = req.params;
        
        try {
            
            const formTask = await Task.findById(id_task);
            
            const taskSubmittedData:any = await TaskSubmitted.findById(id_submitted);
            
            const studentName:any = await Student.findById(taskSubmittedData.idStudent).select('name -_id');
            
            taskSubmittedData.author = studentName.name;
            res.json({formTask, taskSubmittedData: taskSubmittedData, author: studentName.name});
        } catch (error) {
            res.status(400).json({message: error });
        } 
    }

    public async sendTask (req: Request, res: Response) { 
        const { idTask } = req.body;
        const { idStudent } = req.body;
        const { idSubject } = req.body;

        const documents:any = req.files;
        const dateSend = helpers.getDateToday();
        let paths:any = [];
        
        documents.map(function(document:any) {
            paths.push(document.path);
        });

        const taskSubmitted = new TaskSubmitted ({
            idTask: idTask,
            idStudent: idStudent,
            idSubject: idSubject,
            documents: paths,
            state: "none",
            dateSend: dateSend,
            dateModify: dateSend
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
            
            let taskSubmitted:any = await TaskSubmitted.findById(id_task);
            
            let studentName:any = await Student.findById(taskSubmitted.idStudent).select('name -_id');
            
            res.json({taskSubmitted: taskSubmitted, author: studentName});
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getTasksSubmittedSubject (req: Request, res: Response) { 
        const { id_subject } = req.params;
        const { id_student } = req.params;
        let tasksName = [];
        try {  
            let tasksSubmitted:any = await TaskSubmitted.find({ idSubject: id_subject ,
                                                                idStudent: id_student})
                                                        .select('-documents -dateModify');
            
            for(let i = 0; i < tasksSubmitted.length; i ++) {
                let task:any = await Task.findById (tasksSubmitted[i].idTask);
                tasksName.push(task.name);
            }                                                                
            
            res.json({tasksName, tasksSubmitted});
            
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
            

            const proffesorTasks:any = await Task.find({idSubject: 
                {
                    $in: subjectsId
                }});

            
            //change format date to Bolivia
            for(let i = 0; i < proffesorTasks.length; i ++) {
                proffesorTasks[i].deadline =  helpers.changeDateFormatDDMMYYYtoMMDDYYYY(proffesorTasks[i].deadline);
                proffesorTasks[i].visibilityDate =  helpers.changeDateFormatDDMMYYYtoMMDDYYYY(proffesorTasks[i].visibilityDate);
            }
            
            res.json(proffesorTasks);
        } catch (error) {
            
            res.status(400).json({message: error });
        } 
    }

    public async getStudentsAndTasksSubmitted(req: Request, res: Response): Promise<any> {
        const { id_task } = req.params;
        let studentsTasks = [];
        
        try {
            const taskData:any = await Task.findById(id_task);
            
            const studentsSubject:any = await Subject.findById(taskData.idSubject).
                                                    select('enrolledStudents -_id');
            
            const studentsData:any = await Student.find({_id: {
                                                $in: studentsSubject.enrolledStudents
                                            }}).
                                            select('name');
            
            const tasksSubmitted:any = await TaskSubmitted.find({idStudent: 
                                                {
                                                    $in: studentsSubject.enrolledStudents
                                                },
                                                idTask: id_task
                                            });
            let isTaskSubmitted;
            for(let i = 0; i < studentsData.length; i ++) {
                isTaskSubmitted = false;
                for(let j = 0; j < tasksSubmitted.length; j ++) {
                    if(studentsData[i]._id == tasksSubmitted[j].idStudent) {
                        isTaskSubmitted = true;
                        
                        const reviewAssigned:any = await Review.find({idSubmittedTask: tasksSubmitted[j]._id});
                        
                        //Devolvera true si hay revisores asignados y false si no existen revisores en el campo 'reviewAssigned'
                        studentsTasks.push({student: studentsData[i], taskSubmitted: tasksSubmitted[j], reviewAssigned: reviewAssigned != 0}); 
                    }
                }
                if(!isTaskSubmitted)
                    studentsTasks.push({student: studentsData[i], taskSubmitted: null});
            }

            res.json(studentsTasks);
        }
        
        catch (error) {
            res.status(400).json({message: error});
        }
    }

    async getSubjectsTasksStudent(req: Request, res: Response): Promise<any> {
        const {id_student} = req.params;
        let tasksSubjects = [];
        const dateToday = helpers.getDateTodayEngFormat();
        
        try {
            let subjectsData = await Subject.find({enrolledStudents: id_student});
        
            for(let i = 0; i < subjectsData.length; i ++) {
                let tasksSubject:any = await Task.find({idSubject: subjectsData[i]._id, 
                                                    // deadline: {$gte: dateToday},
                                                    visibilityDate: {$lte: dateToday}
                                                });
                
                
                for(let j = 0; j < tasksSubject.length; j ++) {
                    tasksSubject[j].deadline = helpers.changeDateFormatDDMMYYYtoMMDDYYYY(tasksSubject[j].deadline);
                    tasksSubject[j].visibilityDate = helpers.changeDateFormatDDMMYYYtoMMDDYYYY(tasksSubject[j].visibilityDate);
                }
                
                tasksSubjects.push({subject: subjectsData[i], tasksSubject: tasksSubject});
            }
            
            res.json(tasksSubjects);
        }
        catch(error) {
            res.json({message: error});
        }
    }

    async getTaskDate(req: Request, res: Response): Promise<any> {
        const {id_task} = req.params;

        
        try {
            let subjectsData = await Task.findById(id_task).select('deadline -_id');
            res.json(subjectsData);
        }
        catch(error) {
            res.json({message: error});
        }
    }

    async updateTaskDate(req: Request, res: Response): Promise<any> {
        const { idTask } = req.body;
        const { deadline } = req.body;
        const newDeadline = { deadline };
        try {
            const updateFormTask = await Task.findByIdAndUpdate(idTask, newDeadline);
            res.json(updateFormTask);
        }
        catch(error) {
            res.json({message: error});
        }
    }
}

export const tasksController = new TasksController();