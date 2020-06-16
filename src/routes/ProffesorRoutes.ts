import { Router } from 'express';

import proffesorController from '../controllers/proffesorController';


class ProffesorRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/committe/:id_account', proffesorController.getProffesorsAvaliableCommitte);
        this.router.get('/committe/:id_account/:id_submitted_task', proffesorController.getProffesorsAvaliableCommitteAndSelected);
        // this.router.post('/new', .create);
    }
}

const proffesorRoutes = new ProffesorRoutes();
export default proffesorRoutes.router;