import {Request, Response } from 'express';

import { helpers } from '../utils/helpers';
import Subject from '../models/SubjectModel';
import Student from '../models/StudentModel';
import SubjectFile from '../models/SubjectFileModel';
import Reviewers from '../models/ReviewersModel';

class SubjectsController {

    public async list (req: Request, res: Response){ 
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
        
    }

    public async enrolled(req: Request, res: Response): Promise<void> {
        
        const { id_student } = req.body;
        const { subject_code } = req.body;
        try {  
            let isStudentEnrolled:any = await Subject.find({ subjectCode: subject_code, enrolledStudents: id_student});
            
            if(isStudentEnrolled.length)
                res.status(400).json({message: "Ya esta inscrito a esta materia"});
            
            let newEnrolled:any = await Subject.updateOne({ subjectCode: subject_code }, { $push: {enrolledStudents: id_student}});
            
            if(newEnrolled.nModified > 0)
                res.json(newEnrolled);
            
            else {
                res.status(400).json({message: "Código incorrecto"});
            }
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }
    
    public async getStudentSubjects (req: Request, res: Response): Promise<any> { 
        const { id_student } = req.params;
        const { semester } = req.params;
        const { year } = req.params;
        
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

    }

    public async getProffesorSubjects2(req: Request, res: Response): Promise<any> { 
        const { id_proffesor } = req.params;
        const { semester } = req.params;
        const { year } = req.params;

        if(semester != "null") {
            try {  
                let studentSubjects:any = await Subject.find({ idProffesor: id_proffesor })
                                                        .where('year').equals(year)
                                                        .where('semester').equals(semester);
                res.json(studentSubjects);
                
            } catch (error) {
                res.status(400).json({message: error });
            }
        }
        else {
            try {  
                let proffesorSubjects:any = await Subject.find({ idProffesor: id_proffesor });
                res.json(proffesorSubjects);   
            } catch (error) {
                res.status(400).json({message: error });
            }    
        }
        
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


    public async getEnrolledStudentsData (req: Request, res: Response): Promise<any> { 
        const { id_subject } = req.params;
        
        try {  
            let studentsEnrolled:any = await Subject.find({ _id: id_subject })
                                                    .select('enrolledStudents');
            let studentsEnrolledData:any = await Student.find({_id: 
                                                            {
                                                                $in: studentsEnrolled[0].enrolledStudents
                                                            }});
            let studentsdData = [];

            let reviewersAssigned:any = await Reviewers.find({idStudent: 
                {
                    $in: studentsEnrolled[0].enrolledStudents
                }})                                                
            
                for(let i = 0; i < studentsEnrolledData.length; i ++) {
                if(reviewersAssigned[i] != null) {
                    studentsdData.push({studentData: studentsEnrolledData[i], reviewersId: reviewersAssigned[i]._id});
                }
                else {
                    studentsdData.push({studentData: studentsEnrolledData[i], reviewersId: null});
                }
            }

            res.json(studentsdData);
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }
    
    public async addDocument (req: Request, res: Response) { 
        const { idSubject } = req.body;
        const { fileName } = req.body;

        const documents:any = req.files;
        
        
        let path;
        
        documents.map(function(document:any) {
            path = document.path;
        });

        const subjectFile = new SubjectFile ({
            idSubject: idSubject,
            fileName: fileName,
            path: path
        });
        
        try {
            const savedSubjectFile = await subjectFile.save();
            res.json(savedSubjectFile);

        } catch (error) {
            console.log(error);
            res.status(400).json({message: error });
        }
    }

    public async getSubjectFiles (req: Request, res: Response): Promise<any> { 
        const { id_subject } = req.params;
        
        try {  
            let subjectFiles:any = await SubjectFile.find({ idSubject: id_subject })
            console.log(subjectFiles);
            res.json(subjectFiles);
            
        } catch (error) {
            res.status(400).json({message: error });
        }
    }
    
    public async deleteFile(req: Request, res: Response): Promise<any> {
        const { id_file } = req.params;
        
        try {
            const fileData = await SubjectFile.deleteOne({_id: id_file});
            res.json(fileData);
        }
        catch (error) {
            res.json ({message: error});
        }
    }
}

export const subjectsController = new SubjectsController();