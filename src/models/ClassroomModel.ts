import mongoose from 'mongoose';

const ClassroomSchema = new mongoose.Schema({
    classroom: {
        type: String,
        required: true
    },

    idTaskSubmitted: {
        type: String
    }
});
const ClassroomModel = mongoose.model('Classroom', ClassroomSchema);

export default ClassroomModel;