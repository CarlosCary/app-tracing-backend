import { Router } from 'express';

import { subjectsController } from '../controllers/SubjectsController';

class SubjectsRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/new', subjectsController.create);
        this.router.get('/', subjectsController.list);
        this.router.post('/new/enrolled', subjectsController.enrolled);
        this.router.get('/student/:id_student', subjectsController.getStudentSubjects);
        this.router.get('/proffesor/:id_proffesor', subjectsController.getProffesorSubjects);
    }
}

const subjectsRoutes = new SubjectsRoutes();
export default subjectsRoutes.router;