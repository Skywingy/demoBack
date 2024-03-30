import express from 'express';
import teacher from '../controller/teacher';

let router = express.Router();

router.post("/list", teacher.list);
router.post("/create", teacher.create);
router.put("/:id", teacher.update);
router.delete("/:id", teacher.delete);
router.get("/:id", teacher.read);
router.post("/login",teacher.login);

export default router;
