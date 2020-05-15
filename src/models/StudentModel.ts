import mongoose from 'mongoose';


const StudentSchema = new mongoose.Schema({
    name: {
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

    role: {
        type: String
    }
});
const StudentModel = mongoose.model('Student', StudentSchema);

export default StudentModel;