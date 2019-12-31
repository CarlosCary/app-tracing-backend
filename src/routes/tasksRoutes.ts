import { Router } from 'express';

import { tasksController } from '../controllers/tasksController';

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
    }
}

const tasksRoutes = new TasksRoutes();
export default tasksRoutes.router;