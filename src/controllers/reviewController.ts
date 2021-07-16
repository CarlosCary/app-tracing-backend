import {Request, Response } from 'express';
import Review from '../models/ReviewModel';
import Reviewers from '../models/ReviewersModel';
import Student from '../models/StudentModel';
import Proffesor from '../models/ProffesorModel';
import TaskSubmitted from '../models/TaskSubmitted';
import TaskRequested from '../models/TaskRequestedModel';

class ReviewController {

    public async create (req: Request, res: Response): Promise<void>{
        const { formTittles } = req.body;
        const { formDescriptions } = req.body;
        // const { reviewers } = req.body;
        const { idProffesor } = req.body;
        const { idSubmittedTask } = req.body;
        const { idStudent } = req.body;
        let reviewers = [];
        const reviewersData = await Reviewers.findOne({idStudent: idStudent})
                                                .select('reviewers -_id');
        
        for(let i = 0; i < (reviewersData.reviewers).length; i ++) {
            reviewers.push({idProffesor: reviewersData.reviewers[i].idProffesor, 
                            role: reviewersData.reviewers[i].role});
        }
        
        const review = new Review({
            formTittles,
            formDescriptions,
            reviewers,
            idProffesor,
            idSubmittedTask
        })
        
        try {
            const savedReview = await review.save();
            const assignReview = await TaskSubmitted.findByIdAndUpdate(idSubmittedTask, {state: 'reviewersAssigned'});
            res.json(savedReview);
        } catch (error) {
            console.log(error);
            res.status(400).json({message: error });
        }
    }

    public async assignReviewers (req: Request, res: Response): Promise<void>{
        const { reviewersBody } = req.body;
        const { idProffesor } = req.body;
        const { idStudent } = req.body;
        
        const reviewers = new Reviewers({
            reviewers: reviewersBody,
            idProffesor,
            idStudent
        })
        
        try {
            const reviewersSaved = await reviewers.save();
            res.json(reviewersSaved);
        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getReviewersAssigned (req: Request, res: Response): Promise<void>{
        const { id_student } = req.params;
        const { id_proffesor } = req.params;

        const proffesorCareer:any = await Proffesor.findById(id_proffesor).select('career -_id');
        const career = proffesorCareer.career;
        
        try {
            const proffesors = await Proffesor.find()
                                            .where({role: 'proffesor'})
                                            .where({career: career})
                                            .select('name');
            const director = await Proffesor.find()
                                            .where({role: 'director'})
                                            .where({career: career})
                                            .select('name');
            const reviewersData:any = await Reviewers.findOne({idStudent: id_student})
                                                            .select('reviewers');
            
            res.json({reviewersData, proffesors, director});

        } catch (error) {
            res.status(400).json({message: error });
        }
    }

    public async getReviewersAssignedFromStudent (req: Request, res: Response): Promise<void>{
        const { id_student } = req.params;
        
        console.log(id_student);
        try {
            const reviewers:any = await Reviewers.findOne({idStudent: id_student}).select('reviewers -_id');
            res.json(reviewers);

        } catch (error) {
            console.log(error);
            res.status(400).json({message: error });
        }
    }

    public async getReviewFormsProffesor (req: Request, res: Response): Promise<any> { 
        const { id_submitted_task } = req.params;

        try {
            const review:any = await Review.findOne({idSubmittedTask: id_submitted_task});
            let idProffesors = [];
            
            for(let i = 0; i < (review.reviewers).length; i ++) {
                idProffesors.push(review.reviewers[i].idProffesor);
            }

            const reviewersData:any = await Proffesor.find({_id: {
                                        $in: idProffesors
                                    }}).select('name email -_id');
            res.json({reviewersData, idReview: review._id});
        }
        catch(error) {
            res.json({message: 'No review found'});
        }
    }
    
    public async getAssignedReviews (req: Request, res: Response): Promise<any> { 
        const { id_proffesor } = req.params;

        try {
            const assignedReviews:any = await Review.find({"reviewers.idProffesor": id_proffesor});
            let assignedReviewsData = [];
            for(let i = 0 ; i < assignedReviews.length; i ++) {
                const taskSubmittedData:any = await TaskSubmitted.findById(assignedReviews[i].idSubmittedTask);
                const taskData:any = await TaskRequested.findById(taskSubmittedData.idTask).select('name -_id');
                const studentData:any = await Student.findById(taskSubmittedData.idStudent).select('name -_id');    
                assignedReviewsData.push({taskName: taskData.name, studentName: studentData.name, idReview: assignedReviews[i]._id})
            }
            res.json(assignedReviewsData);
        }
        catch(error) {
            res.json({message: 'No review found'});
        }
    }

    public async getAssignedReviewData (req: Request, res: Response): Promise<any> { 
        const { id_review } = req.params;

        try {
            const assignedReview:any = await Review.findById(id_review);
            const taskSubmittedData:any = await TaskSubmitted.findById(assignedReview.idSubmittedTask)
                                                            .select('documents idStudent -_id');
            const student:any = await Student.findById(taskSubmittedData.idStudent).select('name -_id');
            
            res.json({reviewDataTittles: assignedReview.formTittles, 
                    reviewDataDescriptions: assignedReview.formDescriptions,
                    studentName: student.name,
                    documents: taskSubmittedData.documents});
            
        }
        catch(error) {
            res.json({message: 'No review found'});
        }
    }
    
    public async getAssignedReviewers (req: Request, res: Response): Promise<any> { 
        const { id_submitted_task } = req.params;
        let proffesors = [];
        let selected:boolean;
        try {
            const assignedReview:any = await Review.find({idSubmittedTask: id_submitted_task});
            const allProffesors:any = await Student.find()
                                                    .select('name')
                                                    .where({role: 'proffesor'});
            
            for(let i = 0; i < allProffesors.length; i ++) {
                selected = false;
                
                for(let j = 0; j < assignedReview[0].reviewers.length; j ++) {
                    
                    if(assignedReview[0].reviewers[j] == allProffesors[i]._id) {
                        
                        proffesors.push({proffesorData: allProffesors[i], selected: true});
                        selected = true;
                        continue;
                    }
                }
                if(!selected) 
                    proffesors.push({proffesorData: allProffesors[i], selected: false});
            }
            res.json(proffesors);
            
        }
        catch(error) {
            res.json({message: 'No review found'});
        }
    }

    public async updateReview(req: Request, res: Response): Promise<any> {
        const { idSubmitted } = req.body;
        const { reviewers } = req.body;
        const idSubmittedTask = { idSubmittedTask: idSubmitted };

        try {
            const updateFormTask = await Review.findOneAndUpdate(idSubmittedTask, { reviewers });
            res.json(updateFormTask);
        }

        catch (error) {
            res.json ({message: error});
        }
    }


    public async updateReviewers(req: Request, res: Response): Promise<any> {
        const { idReviewers } = req.body;
        const { reviewers } = req.body;
        

        try {
            const updateFormTask = await Reviewers.findByIdAndUpdate(idReviewers, { reviewers });
            res.json(updateFormTask);
        }

        catch (error) {
            res.json ({message: error});
        }
    }

    public async getAssignedReviewsTutor (req: Request, res: Response): Promise<any> { 
        const { id_proffesor } = req.params;

        try {
            const assignedReviews:any = await Review.find({"reviewers.idProffesor": id_proffesor, "reviewers.role": "tutor"});
            let assignedReviewsData = [];
            for(let i = 0 ; i < assignedReviews.length; i ++) {
                const taskSubmittedData:any = await TaskSubmitted.findById(assignedReviews[i].idSubmittedTask);
                const taskData:any = await TaskRequested.findById(taskSubmittedData.idTask).select('name -_id');
                const studentData:any = await Student.findById(taskSubmittedData.idStudent).select('name -_id');    
                assignedReviewsData.push({taskName: taskData.name, studentName: studentData.name, idReview: assignedReviews[i]._id})
            }
            res.json(assignedReviewsData);
        }
        catch(error) {
            res.json({message: 'No review found'});
        }
    }

    public async getAssignedReviews2 (req: Request, res: Response): Promise<any> { 
        const { id_proffesor } = req.params;
        const { role } = req.params;
        
        try {
            let assignedReviews:any;
            if(role === 'all') {
                assignedReviews = await Review.find( {"reviewers.idProffesor": id_proffesor});
            }
                
            else {
                assignedReviews = await Review.find({reviewers: {$elemMatch: {idProffesor: id_proffesor, role: role}}});
            }
                
            
            let assignedReviewsData = [];
            for(let i = 0 ; i < assignedReviews.length; i ++) {
                const taskSubmittedData:any = await TaskSubmitted.findById(assignedReviews[i].idSubmittedTask);
                const taskData:any = await TaskRequested.findById(taskSubmittedData.idTask).select('name -_id');
                const studentData:any = await Student.findById(taskSubmittedData.idStudent).select('name -_id');    
                assignedReviewsData.push({taskName: taskData.name, studentName: studentData.name, idReview: assignedReviews[i]._id})
            }
            res.json(assignedReviewsData);
        }
        catch(error) {
            res.json({message: 'No review found'});
        }
    }
}  

export const reviewController = new ReviewController();
