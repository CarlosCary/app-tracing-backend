"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
const ReviewersModel_1 = __importDefault(require("../models/ReviewersModel"));
const StudentModel_1 = __importDefault(require("../models/StudentModel"));
const ProffesorModel_1 = __importDefault(require("../models/ProffesorModel"));
const TaskSubmitted_1 = __importDefault(require("../models/TaskSubmitted"));
const TaskRequestedModel_1 = __importDefault(require("../models/TaskRequestedModel"));
class ReviewController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { formTittles } = req.body;
            const { formDescriptions } = req.body;
            // const { reviewers } = req.body;
            const { idProffesor } = req.body;
            const { idSubmittedTask } = req.body;
            const { idStudent } = req.body;
            let reviewers = [];
            let reviewersData;
            reviewersData = yield ReviewersModel_1.default.findOne({ idStudent: idStudent })
                .select('reviewers -_id');
            for (let i = 0; i < (reviewersData.reviewers).length; i++) {
                reviewers.push({ idProffesor: reviewersData.reviewers[i].idProffesor,
                    role: reviewersData.reviewers[i].role });
            }
            const review = new ReviewModel_1.default({
                formTittles,
                formDescriptions,
                reviewers,
                idProffesor,
                idSubmittedTask
            });
            try {
                const savedReview = yield review.save();
                const assignReview = yield TaskSubmitted_1.default.findByIdAndUpdate(idSubmittedTask, { state: 'reviewersAssigned' });
                res.json(savedReview);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: error });
            }
        });
    }
    assignReviewers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reviewersBody } = req.body;
            const { idProffesor } = req.body;
            const { idStudent } = req.body;
            const reviewers = new ReviewersModel_1.default({
                reviewers: reviewersBody,
                idProffesor,
                idStudent
            });
            try {
                const reviewersSaved = yield reviewers.save();
                res.json(reviewersSaved);
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getReviewersAssigned(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_student } = req.params;
            const { id_proffesor } = req.params;
            const proffesorCareer = yield ProffesorModel_1.default.findById(id_proffesor).select('career -_id');
            const career = proffesorCareer.career;
            try {
                const proffesors = yield ProffesorModel_1.default.find()
                    .where({ role: 'proffesor' })
                    .where({ career: career })
                    .select('name');
                const director = yield ProffesorModel_1.default.find()
                    .where({ role: 'director' })
                    .where({ career: career })
                    .select('name');
                const reviewersData = yield ReviewersModel_1.default.findOne({ idStudent: id_student })
                    .select('reviewers');
                res.json({ reviewersData, proffesors, director });
            }
            catch (error) {
                res.status(400).json({ message: error });
            }
        });
    }
    getReviewersAssignedFromStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_student } = req.params;
            console.log(id_student);
            try {
                const reviewers = yield ReviewersModel_1.default.findOne({ idStudent: id_student }).select('reviewers -_id');
                res.json(reviewers);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: error });
            }
        });
    }
    getReviewFormsProffesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_submitted_task } = req.params;
            try {
                const review = yield ReviewModel_1.default.findOne({ idSubmittedTask: id_submitted_task });
                let idProffesors = [];
                for (let i = 0; i < (review.reviewers).length; i++) {
                    idProffesors.push(review.reviewers[i].idProffesor);
                }
                const reviewersData = yield ProffesorModel_1.default.find({ _id: {
                        $in: idProffesors
                    } }).select('name email -_id');
                res.json({ reviewersData, idReview: review._id });
            }
            catch (error) {
                res.json({ message: 'No review found' });
            }
        });
    }
    getAssignedReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_proffesor } = req.params;
            try {
                const assignedReviews = yield ReviewModel_1.default.find({ "reviewers.idProffesor": id_proffesor });
                let assignedReviewsData = [];
                for (let i = 0; i < assignedReviews.length; i++) {
                    const taskSubmittedData = yield TaskSubmitted_1.default.findById(assignedReviews[i].idSubmittedTask);
                    const taskData = yield TaskRequestedModel_1.default.findById(taskSubmittedData.idTask).select('name -_id');
                    const studentData = yield StudentModel_1.default.findById(taskSubmittedData.idStudent).select('name -_id');
                    assignedReviewsData.push({ taskName: taskData.name, studentName: studentData.name, idReview: assignedReviews[i]._id });
                }
                res.json(assignedReviewsData);
            }
            catch (error) {
                res.json({ message: 'No review found' });
            }
        });
    }
    getAssignedReviewData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_review } = req.params;
            try {
                const assignedReview = yield ReviewModel_1.default.findById(id_review);
                const taskSubmittedData = yield TaskSubmitted_1.default.findById(assignedReview.idSubmittedTask)
                    .select('documents idStudent -_id');
                const student = yield StudentModel_1.default.findById(taskSubmittedData.idStudent).select('name -_id');
                res.json({ reviewDataTittles: assignedReview.formTittles,
                    reviewDataDescriptions: assignedReview.formDescriptions,
                    studentName: student.name,
                    documents: taskSubmittedData.documents });
            }
            catch (error) {
                res.json({ message: 'No review found' });
            }
        });
    }
    getAssignedReviewers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_submitted_task } = req.params;
            let proffesors = [];
            let selected;
            try {
                const assignedReview = yield ReviewModel_1.default.find({ idSubmittedTask: id_submitted_task });
                const allProffesors = yield StudentModel_1.default.find()
                    .select('name')
                    .where({ role: 'proffesor' });
                for (let i = 0; i < allProffesors.length; i++) {
                    selected = false;
                    for (let j = 0; j < assignedReview[0].reviewers.length; j++) {
                        if (assignedReview[0].reviewers[j] == allProffesors[i]._id) {
                            proffesors.push({ proffesorData: allProffesors[i], selected: true });
                            selected = true;
                            continue;
                        }
                    }
                    if (!selected)
                        proffesors.push({ proffesorData: allProffesors[i], selected: false });
                }
                res.json(proffesors);
            }
            catch (error) {
                res.json({ message: 'No review found' });
            }
        });
    }
    updateReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idSubmitted } = req.body;
            const { reviewers } = req.body;
            const idSubmittedTask = { idSubmittedTask: idSubmitted };
            try {
                const updateFormTask = yield ReviewModel_1.default.findOneAndUpdate(idSubmittedTask, { reviewers });
                res.json(updateFormTask);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    updateReviewers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idReviewers } = req.body;
            const { reviewers } = req.body;
            try {
                const updateFormTask = yield ReviewersModel_1.default.findByIdAndUpdate(idReviewers, { reviewers });
                res.json(updateFormTask);
            }
            catch (error) {
                res.json({ message: error });
            }
        });
    }
    getAssignedReviewsTutor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_proffesor } = req.params;
            try {
                const assignedReviews = yield ReviewModel_1.default.find({ "reviewers.idProffesor": id_proffesor, "reviewers.role": "tutor" });
                let assignedReviewsData = [];
                for (let i = 0; i < assignedReviews.length; i++) {
                    const taskSubmittedData = yield TaskSubmitted_1.default.findById(assignedReviews[i].idSubmittedTask);
                    const taskData = yield TaskRequestedModel_1.default.findById(taskSubmittedData.idTask).select('name -_id');
                    const studentData = yield StudentModel_1.default.findById(taskSubmittedData.idStudent).select('name -_id');
                    assignedReviewsData.push({ taskName: taskData.name, studentName: studentData.name, idReview: assignedReviews[i]._id });
                }
                res.json(assignedReviewsData);
            }
            catch (error) {
                res.json({ message: 'No review found' });
            }
        });
    }
    getAssignedReviews2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_proffesor } = req.params;
            const { role } = req.params;
            try {
                let assignedReviews;
                if (role === 'all') {
                    assignedReviews = yield ReviewModel_1.default.find({ "reviewers.idProffesor": id_proffesor });
                }
                else {
                    assignedReviews = yield ReviewModel_1.default.find({ reviewers: { $elemMatch: { idProffesor: id_proffesor, role: role } } });
                }
                let assignedReviewsData = [];
                for (let i = 0; i < assignedReviews.length; i++) {
                    const taskSubmittedData = yield TaskSubmitted_1.default.findById(assignedReviews[i].idSubmittedTask);
                    const taskData = yield TaskRequestedModel_1.default.findById(taskSubmittedData.idTask).select('name -_id');
                    const studentData = yield StudentModel_1.default.findById(taskSubmittedData.idStudent).select('name -_id');
                    assignedReviewsData.push({ taskName: taskData.name, studentName: studentData.name, idReview: assignedReviews[i]._id });
                }
                res.json(assignedReviewsData);
            }
            catch (error) {
                res.json({ message: 'No review found' });
            }
        });
    }
}
exports.reviewController = new ReviewController();
