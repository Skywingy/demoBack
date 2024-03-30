import express from 'express';
import StudentChosen from '../controller/studentChosen';

let router = express.Router();

router.get("/list/:id", StudentChosen.list);
router.delete("/:id", StudentChosen.delete);
router.get("/:id", StudentChosen.read);

export default router;
