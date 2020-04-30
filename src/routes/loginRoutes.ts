import { Router } from 'express';

import {loginController} from '../controllers/loginController';

class LoginRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/signup', loginController.signup);
        this.router.post('/signin', loginController.signin);
        this.router.post('/proffesor/new', loginController.registerProffesor);
        this.router.get('/proffesor/all', loginController.getProffesors);
        this.router.get('/proffesor/:id_proffesor', loginController.getProffesor);
        this.router.put('/proffesor/update', loginController.updateProffesor);
        this.router.get('/account/:id_account', loginController.getDataAccount);
        this.router.put('/account/update', loginController.updateAccount);
        this.router.put('/account/update/password', loginController.updatePassword);
    }
}

const loginRoutes = new LoginRoutes();
export default loginRoutes.router;