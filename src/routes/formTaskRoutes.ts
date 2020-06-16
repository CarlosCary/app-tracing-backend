import { Router } from 'express';

import { formTaskController } from '../controllers/formTaskController';

class FormTaskRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/new', formTaskController.create);
        this.router.get('/all/:id_proffesor', formTaskController.getFormsTasksProffesor);
        this.router.get('/:id_form_task', formTaskController.getFormTask);
        this.router.put('/update', formTaskController.updateFormTask);
    }
}

const formTaskRoutes = new FormTaskRoutes();
export default formTaskRoutes.router;
