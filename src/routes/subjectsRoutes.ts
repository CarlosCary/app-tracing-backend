import { Router } from 'express';

import { subjectsController } from '../controllers/subjectsController';

import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, body, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage, limits: {
                    fileSize: 1024 * 1024 * 10 //10 MB Max file size
                }});

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
        this.router.post('/document/new', upload.array("fileDocument", 12),subjectsController.addDocument);
        this.router.get('/files/:id_subject', subjectsController.getSubjectFiles);
        this.router.delete('/file/delete/:id_file', subjectsController.deleteFile);
    }
}

const subjectsRoutes = new SubjectsRoutes();
export default subjectsRoutes.router;