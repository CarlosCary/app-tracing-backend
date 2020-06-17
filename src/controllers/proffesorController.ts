import {Request, Response } from 'express';
import Proffesor from '../models/ProffesorModel';
import Review from '../models/ReviewModel';

class ProffesorController {

    public async getProffesorsAvaliableCommitte (req: Request, res: Response) {
        // const { career } = req.params;
        const { id_account } = req.params;

        try {
            const proffesorCareer:any = await Proffesor.findById(id_account).select('career -_id');
            const career = proffesorCareer.career;
            
            const proffesors = await Proffesor.find()
                                            .where({role: 'proffesor'})
                                            .where({career: career})
                                            .select('name');
            const director = await Proffesor.find()
                                            .where({role: 'director'})
                                            .where({career: career})
                                            .select('name');
            res.json({proffesors, director});
        } catch(error) {
            res.json({message:error});
        }
    }

    public async getProffesorsAvaliableCommitteAndSelected (req: Request, res: Response) {
        // const { career } = req.params;
        const { id_account } = req.params;
        const { id_submitted_task } = req.params;

        try {
            const proffesorCareer:any = await Proffesor.findById(id_account).select('career -_id');
            const career = proffesorCareer.career;
            
            const proffesors = await Proffesor.find()
                                            .where({role: 'proffesor'})
                                            .where({career: career})
                                            .select('name');
            const director = await Proffesor.find()
                                            .where({role: 'director'})
                                            .where({career: career})
                                            .select('name');
            
            const idProffesorsSelected:any = await Review.findOne({idSubmittedTask: id_submitted_task})
                                                    .select('reviewers ');

            
            
            res.json({proffesors, director, 
                        committe: idProffesorsSelected, 
                        idReview: idProffesorsSelected._id});
        } catch(error) {
            res.json({message:error});
        }
    }
}

const proffesorController = new ProffesorController();
export default proffesorController;
