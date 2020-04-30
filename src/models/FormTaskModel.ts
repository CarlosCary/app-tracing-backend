import mongoose from 'mongoose';

const FormTaskSchema = new mongoose.Schema({
    formTittle: {
        type: String,
        required: true
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
const FormTaskModel = mongoose.model('FormTask', FormTaskSchema);

export default FormTaskModel;