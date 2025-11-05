import { Router, Request, Response } from "express";
import { createPost, deletePostById, getPosts } from "../db/posts/posts";
import { validateCreatePostPayloadMiddleware } from "../middlewares/createPostMiddleware";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.delete("/:postId", async (req: Request, res: Response) => {
  const postId = req.params.postId;
  await deletePostById(postId);
  res.status(200).send();
});

router.post(
  "/",
  validateCreatePostPayloadMiddleware,
  async (req: Request, res: Response) => {
    const payload = req.body;
    const post = await createPost(payload);
    res.status(201).send({ data: post });
  }
);

export default router;
