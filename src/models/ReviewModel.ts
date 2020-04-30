import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    formTittles: {
        type: [String],
        required: true
    },

    formDescriptions: {
        type: [String]
    },

    reviewers: {
        type: [{idProffesor: String, role: String}],
        required: true
    },

    idProffesor: {
        type: String,
        required: true
    },

    idSubmittedTask: {
        type: String,
        required: true
    }
});
const ReviewModel = mongoose.model('Review', ReviewSchema);

export default ReviewModel;