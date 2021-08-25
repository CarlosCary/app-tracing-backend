import mongoose from 'mongoose';

const AnswerReviewSchema = new mongoose.Schema({
    tittlesForm: {
        type: [String],
        required: true
    },

    feedBackAnswers: {
        type: [String]
    },

    idProffesor: {
        type: String,
        required: true
    },

    dateHourReview: {
        type: String,
        required: true
    },

    idReview: {
        type: String,
        required: true
    }
});
const AnswerReviewModel = mongoose.model('AnswerReview', AnswerReviewSchema);

export default AnswerReviewModel;