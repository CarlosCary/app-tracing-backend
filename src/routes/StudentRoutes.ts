import { Router } from 'express';

import studentController from '../controllers/studentController';

class StudentRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', studentController.list);
        this.router.post('/new', studentController.create);
    }
}

const studentRoutes = new StudentRoutes();
export default studentRoutes.router;