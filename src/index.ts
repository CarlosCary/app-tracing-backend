import express from 'express';
import { Application } from 'express-serve-static-core';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';

import indexRoutes from './routes/indexRoutes';
import gameRoutes from './routes/gameRoutes';
import loginRoutes from './routes/loginRoutes';
import subjectsRoutes from './routes/subjectsRoutes';
import tasksRoutes from './routes/tasksRoutes';

// import passport1 from './controllers/passPortController';

class Server {

    public app: Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan("dev")); //nos ayuda a ver en consola las peticiones que se hacen
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/games', gameRoutes);
        this.app.use('/', loginRoutes);
        this.app.use('/subjects', subjectsRoutes);
        this.app.use('/tasks', tasksRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();