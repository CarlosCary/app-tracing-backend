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
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const subjectsRoutes_1 = __importDefault(require("./routes/subjectsRoutes"));
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const FormTaskRoutes_1 = __importDefault(require("./routes/FormTaskRoutes"));
const FormReviewRoutes_1 = __importDefault(require("./routes/FormReviewRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const answerReviewRoutes_1 = __importDefault(require("./routes/answerReviewRoutes"));
const proffesorRoutes_1 = __importDefault(require("./routes/proffesorRoutes"));
const ClassroomRoutes_1 = __importDefault(require("./routes/ClassroomRoutes"));
const NotificationsRoutes_1 = __importDefault(require("./routes/NotificationsRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        this.auth = process.env.DB_CONNECTION;
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev")); //nos ayuda a ver en consola las peticiones que se hacen
        this.app.use(cors_1.default());
        this.app.use('/uploads', express_1.default.static('uploads'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/', loginRoutes_1.default);
        this.app.use('/subjects', subjectsRoutes_1.default);
        this.app.use('/tasks', tasksRoutes_1.default);
        this.app.use('/student', studentRoutes_1.default);
        this.app.use('/form/task', FormTaskRoutes_1.default);
        this.app.use('/form/review', FormReviewRoutes_1.default);
        this.app.use('/review', reviewRoutes_1.default);
        this.app.use('/review/answer', answerReviewRoutes_1.default);
        this.app.use('/proffesor', proffesorRoutes_1.default);
        this.app.use('/classroom', ClassroomRoutes_1.default);
        this.app.use('/notifications', NotificationsRoutes_1.default);
    }
    start() {
        const auth = process.env.DB_CONNECTION;
        mongoose_1.default.connect(auth, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connected to mongoDB"));
        mongoose_1.default.set('useFindAndModify', false);
        this.app.listen(this.app.get('port'), () => {
            console.log("Server on port ", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
