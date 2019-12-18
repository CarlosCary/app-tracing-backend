"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gameRoutes_1 = __importDefault(require("./routes/gameRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const subjectsRoutes_1 = __importDefault(require("./routes/subjectsRoutes"));
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
// import passport1 from './controllers/passPortController';
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev")); //nos ayuda a ver en consola las peticiones que se hacen
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/games', gameRoutes_1.default);
        this.app.use('/', loginRoutes_1.default);
        this.app.use('/subjects', subjectsRoutes_1.default);
        this.app.use('/tasks', tasksRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
