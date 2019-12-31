import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});
const StudentModel = mongoose.model('Student', StudentSchema);

export default StudentModel;