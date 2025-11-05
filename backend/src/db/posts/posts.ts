import { connection } from "../connection";
import { deletePostTemplate, selectPostsTemplate } from "./query-templates";
import { Post } from "./types";

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
