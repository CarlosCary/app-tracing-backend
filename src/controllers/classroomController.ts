import {Request, Response } from 'express';
import AnswerReview from '../models/AnswerReviewModel';
import Student from '../models/StudentModel';
import Classroom from '../models/ClassroomModel';

class ClassroomController {

    public async create (req: Request, res: Response): Promise<void>{
        const { classroom } = req.body;
        const { idTaskSubmitted } = req.body;

        const classroomCode = new Classroom({
            classroom,
            idTaskSubmitted,
        })
        
        try {
            const savedclassroomCode = await classroomCode.save();
            res.json(savedclassroomCode);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getAnswersReviewProffesors(req: Request, res: Response): Promise<any> { 
        const { id_review } = req.params;
        let answersProffesorsData = [];
        
        try {
            const answersReviewProffesors:any = await AnswerReview.find({idReview: id_review});
            
            for(let i = 0; i < answersReviewProffesors.length; i ++) {
                const proffesorName:any = await Student.findById(answersReviewProffesors[i].idProffesor)
                                                    .select('name -_id');
                let answersProffesor = [];
                for(let j = 0; j < answersReviewProffesors[i].tittlesForm.length; j ++) {
                    answersProffesor.push({tittle: answersReviewProffesors[i].tittlesForm[j],
                                            answer: answersReviewProffesors[i].feedBackAnswers[j]});
                }
                answersProffesorsData.push({proffesorName: proffesorName.name, answersProffesor});
            }
            

            res.json(answersProffesorsData);
        }
        catch(error) {
            res.json({message: error});
        }
    }
}

export const classroomController = new ClassroomController();
