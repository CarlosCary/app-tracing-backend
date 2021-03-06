import mongoose from 'mongoose';

const TaskSubmittedSchema = new mongoose.Schema({
    idTask: {
        type: String,
        required: true
    },

    idStudent: {
        type: String,
        required: true
    },

    idSubject: {
        type: String,
        required: true
    },

    documents: {
    },

    state: {
        type: String
    },

    descriptionChecked: {
        type: String
    },

    dateSend: {
    },

    dateModify: {
    },
});

const TaskSubmittedModel = mongoose.model('TaskSubmitted', TaskSubmittedSchema);

export default TaskSubmittedModel;