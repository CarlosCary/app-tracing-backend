import mongoose from 'mongoose';

const TaskRequestedSchema = new mongoose.Schema({
    idSubject: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    deadline: {
        type: String,
        required: true
    },

    visibilityDate: {
        type: String,
        required: true
    },

    students: {
        type: [String]
    },

    documentsRequested: {
        type: [String]
    },

    formRequested: {
        tittleForm: [String],
        descriptionForm: [String]
    },

});
const TaskRequestedModel = mongoose.model('Task', TaskRequestedSchema);

export default TaskRequestedModel;