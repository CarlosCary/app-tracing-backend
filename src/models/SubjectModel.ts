import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    semester: {
        type: String,
        required: true
    },

    year: {
        type: String,
        required: true
    },

    idProffesor: {
        type: String,
        required: true
    },

    subjectCode: {
        type: String,
        required: true
    },

    enrolledStudents: {
        type: [String]
    },

});
const SubjectModel = mongoose.model('Subject', SubjectSchema);

export default SubjectModel;