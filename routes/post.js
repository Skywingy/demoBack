import express from 'express';
import post from '../controller/post';

let router = express.Router();

router.post("/list", post.list);
router.post("/create", post.create);
router.put("/:postid", post.update);
router.delete("/:postid", post.delete);
router.get("/:postid", post.read);

export default router;
