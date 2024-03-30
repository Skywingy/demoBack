import express from "express";
import lesson from "../controller/lesson";

const router = express.Router();

router.get("/:id", lesson.read);
router.post("/list", lesson.list);
router.post("/create", lesson.create);
router.put("/:id", lesson.update);
router.delete("/:id", lesson.delete);

export default router;
