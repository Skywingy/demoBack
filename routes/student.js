import express from "express";
import student from "../controller/student";

const router = express.Router();

router.post('/login', student.login);
router.get("/:id", student.read);
router.post('/list', student.list);
router.post("/create", student.create);
router.put("/:id", student.update);
router.delete("/:id", student.delete);






export default router;