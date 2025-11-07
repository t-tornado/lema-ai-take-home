import { Router, Request, Response } from "express";
import { createPost, deletePostById, getPosts } from "../db/posts/posts";
import { validateCreatePostPayloadMiddleware } from "../middlewares/validateCreatePostPayloadMiddleware";
import { createIdValidatorMiddleware } from "../middlewares/createIdValidatorMiddleware";

const router = Router();

router.get(
  "/",
  createIdValidatorMiddleware((req) => req.query.userId?.toString() ?? "", {
    field: "user_id",
  }),
  async (req: Request, res: Response) => {
    const userId = req.query.userId?.toString()!;
    try {
      const posts = await getPosts(userId);
      res.send(posts);
    } catch (error) {
      res.status(500).json({
        errors: [
          {
            type: "internal_server_error",
            code: "server_error",
            message: "Failed to get posts",
          },
        ],
      });
    }
  }
);

router.delete(
  "/:postId",
  createIdValidatorMiddleware((req) => req.params.postId, {
    field: "post_id",
  }),
  async (req: Request, res: Response) => {
    const postId = req.params.postId;
    try {
      await deletePostById(postId);
      res.status(200).send({ status: "success" });
    } catch (error) {
      res.status(500).json({
        errors: [
          {
            type: "internal_server_error",
            code: "server_error",
            message: "Failed to delete post",
          },
        ],
      });
      return;
    }
  }
);

router.post(
  "/",
  createIdValidatorMiddleware((req) => req.body.user_id, {
    field: "user_id",
  }),
  validateCreatePostPayloadMiddleware,
  async (req: Request, res: Response) => {
    const payload = req.body;
    try {
      const data = await createPost(payload);
      res.status(201).send({ data });
    } catch (error) {
      res.status(500).json({
        errors: [
          {
            type: "internal_server_error",
            code: "server_error",
            message: "Failed to create post",
          },
        ],
      });
      return;
    }
  }
);

export default router;
