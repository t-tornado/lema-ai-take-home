import { idHelper } from "../../utils/idHelper";
import { connection } from "../connection";
import {
  createPostTemplate,
  deletePostTemplate,
  selectPostsTemplate,
} from "./query-templates";
import { CreatePostPayload, Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  new Promise((resolve, reject) => {
    connection.all(selectPostsTemplate, [userId], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePostById = (postId: string): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.run(deletePostTemplate, [postId], (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

export const createPost = (payload: CreatePostPayload): Promise<any> =>
  new Promise((resolve, reject) => {
    const newId = idHelper.generate();

    connection.get(
      createPostTemplate,
      [
        newId,
        payload.title,
        payload.body,
        payload.user_id,
        new Date().toISOString(),
      ],
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as Post);
      }
    );
  });
