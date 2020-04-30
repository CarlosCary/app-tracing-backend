import mongoose from 'mongoose';

const NotificationsSchema = new mongoose.Schema({
    idProffesor: {
        type: String,
        required: true
    },

    director: {
        type: Number
    },

    rapporteur: {
        type: Number
    },

    tutor: {
        type: Number
    }
});
const ClassroomModel = mongoose.model('Notifications', NotificationsSchema);

export default ClassroomModel;