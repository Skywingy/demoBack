import express from 'express';
import teacherV from '../controller/teacherV';

let router = express.Router();

router.get("/list/:id", teacherV.list);


export default router;
