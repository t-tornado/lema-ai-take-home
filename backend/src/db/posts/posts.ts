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
    const generateId = (): string => {
      return Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    };

    const newId = generateId();
    connection.run(
      createPostTemplate,
      [
        newId,
        payload.title,
        payload.body,
        payload.user_id,
        new Date().toISOString(),
      ],
      function (error) {
        if (error) {
          reject(error);
        }
        connection.get(
          "SELECT * FROM posts WHERE id = ?",
          [this.lastID],
          (err, row) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(row as Post);
          }
        );
      }
    );
  });
