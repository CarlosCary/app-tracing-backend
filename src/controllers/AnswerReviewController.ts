import {Request, Response } from 'express';
import AnswerReview from '../models/AnswerReviewModel';
import Student from '../models/StudentModel';
import Proffesor from '../models/ProffesorModel';

class AnswerReviewController {

    public async create (req: Request, res: Response): Promise<void>{
        const { tittlesForm } = req.body;
        const { feedBackAnswers } = req.body;
        const { idProffesor } = req.body;
        const { idReview } = req.body;

        const answerReview = new AnswerReview({
            tittlesForm,
            feedBackAnswers,
            idProffesor,
            idReview
        })
        
        try {
            const savedAnswerReview= await answerReview.save();
            res.json(savedAnswerReview);
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
                const proffesorName:any = await Proffesor.findById(answersReviewProffesors[i].idProffesor)
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

export const answerReviewController = new AnswerReviewController();