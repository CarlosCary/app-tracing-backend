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

    documents: {
    }
});

const TaskSubmittedModel = mongoose.model('TaskSubmitted', TaskSubmittedSchema);

export default TaskSubmittedModel;