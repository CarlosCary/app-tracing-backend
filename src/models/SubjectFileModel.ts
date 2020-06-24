import mongoose from 'mongoose';

const SubjectFileSchema = new mongoose.Schema({
    idSubject: {
        type: String,
        required: true
    },

    fileName: {
        type: String,
        required: true
    },

    path: {
    }
});

const SubjectFileModel = mongoose.model('SubjectFile', SubjectFileSchema);

export default SubjectFileModel;