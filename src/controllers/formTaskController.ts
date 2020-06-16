import {Request, Response } from 'express';
import { helpers } from '../utils/helpers';
import FormTask from '../models/FormTaskModel';

class FormTaskController {

    public async create (req: Request, res: Response): Promise<void>{
        const { formTittle } = req.body;
        const { tittles } = req.body;
        const { descriptions } = req.body;
        const { idProffesor } = req.body;

        const formTask = new FormTask({
            formTittle,
            tittles,
            descriptions,
            idProffesor
        })
        
        try {
            const savedFormTask = await formTask.save();
            res.json(savedFormTask);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getFormsTasksProffesor (req: Request, res: Response): Promise<any> { 
        const { id_proffesor } = req.params;

        try {
            const formsTasksProffesor = await FormTask.find({idProffesor: id_proffesor});
            res.json(formsTasksProffesor);
        }
        catch(error) {
            res.json({message: error});
        }
    }

    public async getFormTask (req: Request, res: Response): Promise<any> { 
        const { id_form_task } = req.params;

        try {
            const formTask = await FormTask.findById(id_form_task);
            res.json(formTask);
        }
        catch(error) {
            res.json({message: error});
        }
    }

    public async updateFormTask(req: Request, res: Response): Promise<any> {
        const { idTaskForm } = req.body;
        const { formTittle } = req.body;
        const { formDescription } = req.body;
        const { tittles } = req.body;
        const { descriptions } = req.body;

        try {
            const updateFormTask = await FormTask.findByIdAndUpdate(idTaskForm, {
                formTittle: formTittle,
                formDescription: formDescription,
                tittles: tittles,
                descriptions: descriptions
            })

            res.json(updateFormTask);
        }

        catch (error) {
            res.json ({message: error});
        }
    }
}

export const formTaskController = new FormTaskController();
