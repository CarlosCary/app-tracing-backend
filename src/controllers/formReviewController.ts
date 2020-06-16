import {Request, Response } from 'express';
import FormReview from '../models/FormReviewModel';

class FormReviewController {
    
    public async create (req: Request, res: Response): Promise<void>{
        const { formTittle } = req.body;
        const { formDescription } = req.body;
        const { tittles } = req.body;
        const { descriptions } = req.body;
        const { idProffesor } = req.body;

        const formReview = new FormReview({
            formTittle,
            formDescription,
            tittles,
            descriptions,
            idProffesor
        })
        
        try {
            const savedFormReview = await formReview.save();
            res.json(savedFormReview);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getReviewFormsProffesor (req: Request, res: Response): Promise<any> { 
        const { id_proffesor } = req.params;

        try {
            const formsReviewProffesor = await FormReview.find({idProffesor: id_proffesor});
            res.json(formsReviewProffesor);
        }
        catch(error) {
            res.json({message: error});
        }
    }

    public async getReviewForm(req: Request, res: Response): Promise<any> { 
        const { id_form_task } = req.params;

        try {
            const reviewForm = await FormReview.findById(id_form_task);
            res.json(reviewForm);
        }
        catch(error) {
            res.json({message: error});
        }
    }

    public async updateReviewForm(req: Request, res: Response): Promise<any> {
        const { idReviewForm } = req.body;
        const { formTittle } = req.body;
        const { formDescription } = req.body;
        const { tittles } = req.body;
        const { descriptions } = req.body;

        try {
            const updateReviewForm = await FormReview.findByIdAndUpdate(idReviewForm, {
                formTittle: formTittle,
                formDescription: formDescription,
                tittles: tittles,
                descriptions: descriptions
            })

            res.json(updateReviewForm);
        }

        catch (error) {
            res.json ({message: error});
        }
    }

    
}

export const formReviewController = new FormReviewController();
