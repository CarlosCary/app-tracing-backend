import { Router } from 'express';
import { tasksController } from '../controllers/tasksController';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, body, cb) {
        cb(null, './upload');
    },

    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage, limits: {
                    fileSize: 1024 * 1024 * 10 //10 MB Max file size
                }});

class TasksRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/new', tasksController.createTask);
        this.router.get('/all/:id_student', tasksController.getAllTaskStudentAvaliable);
        this.router.get('/proffesor/all/:id_proffesor', tasksController.getAllTaskProffesorAvaliable);
        this.router.get('/form/:id_task', tasksController.getFormRequestedTask);
        this.router.post('/send', upload.array("fileDocument", 12),tasksController.sendTask);
        this.router.get('/submitted/:id_task', tasksController.getTaskSubmitted);
        this.router.get('/proffesor/:id_subject/:id_student', tasksController.getTasksSubmittedSubject);
        this.router.post('/proffesor/checked', tasksController.taskChecked);
        this.router.get('/subject/:id_task/students', tasksController.getStudentsAndTasksSubmitted);
        this.router.get('/subjects/:id_student', tasksController.getSubjectsTasksStudent);
        this.router.get('/submitted/:id_task/:id_student', tasksController.getTaskSubmittedData);
        this.router.get('/submitted/:id_task/:id_student/:id_submitted', tasksController.getTaskSubmittedData2);
        this.router.get('/date/:id_task', tasksController.getTaskDate);
        this.router.put('/date/update', tasksController.updateTaskDate);
        this.router.get('/prueba', tasksController.prueba);
    }

}

const tasksRoutes = new TasksRoutes();
export default tasksRoutes.router;