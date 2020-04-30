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
        this.router.get('/student/:id_student/:semester/:year', subjectsController.getStudentSubjects);
        this.router.get('/proffesor/:id_proffesor/:semester/:year', subjectsController.getProffesorSubjects2);
        this.router.get('/proffesor/:id_proffesor', subjectsController.getProffesorSubjects);
        this.router.get('/enrolled/:id_subject', subjectsController.getEnrolledStudentsData);
    }
}

const subjectsRoutes = new SubjectsRoutes();
export default subjectsRoutes.router;