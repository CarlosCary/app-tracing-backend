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
        this.router.post('/document', tasksController.addDocumentTask);
        this.router.post('/form', tasksController.addFormTask);
        this.router.post('/student/task', tasksController.addTaskStudent);
        this.router.post('/students', tasksController.assignTaskAllStudentsSubject);
        this.router.get('/all/:id_student', tasksController.getAllTaskStudentAvaliable);
        this.router.get('/form/:id_task', tasksController.getFormRequestedTask);
        this.router.post('/send', upload.array("fileDocument", 12),tasksController.sendTask);
    }

}

const tasksRoutes = new TasksRoutes();
export default tasksRoutes.router;