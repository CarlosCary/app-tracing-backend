import mongoose from 'mongoose';

const ProffesorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    career: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    academicDegree: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
});
const ProffesorModel = mongoose.model('Proffesor', ProffesorSchema);

export default ProffesorModel;