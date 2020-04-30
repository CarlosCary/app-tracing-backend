import mongoose from 'mongoose';

const FormReviewSchema = new mongoose.Schema({
    formTittle: {
        type: String,
        required: true
    },

    formDescription: {
        type: String
    },

    tittles: {
        type: [String],
        required: true
    },

    descriptions: {
        type: [String],
        requered: true
    },

    idProffesor: {
        type: String,
        required: true
    }
});
const FormReviewModel = mongoose.model('FormReview', FormReviewSchema);

export default FormReviewModel;