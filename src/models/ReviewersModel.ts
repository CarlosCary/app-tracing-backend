import mongoose from 'mongoose';

const ReviewersSchema = new mongoose.Schema({
    reviewers: {
        type: [{idProffesor: String, role: String}],
        required: true
    },

    idProffesor: {
        type: String,
        required: true
    },

    idStudent: {
        type: String,
        required: true
    }
});
const ReviewersModel = mongoose.model('Reviewers', ReviewersSchema);

export default ReviewersModel;