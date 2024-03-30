import express from "express";
import studentClass from "../controller/studentClass";

const router = express.Router();

router.post("/list", studentClass.list);
router.put("/:id", studentClass.update);
router.get("/:id", studentClass.read);
router.post("/create", studentClass.create);




export default router;