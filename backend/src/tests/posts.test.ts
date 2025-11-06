import { app } from "..";
import request from "supertest";

describe("Posts", () => {
  it("Deletes a user's post", async () => {
    const server = request(app);
    const postsResponse = await server
      .get("/posts?userId=9a7848eef30046edbbb6680d5fca2ec1")
      .expect(200);

    const postId = postsResponse.body[0].id;
    const allPosts = postsResponse.body;

    if (allPosts.length < 1) {
      return;
    }

    const deleteResponse = await server.delete(`/posts/${postId}`).expect(200);

    const postsResponseAfterDelete = await server
      .get("/posts?userId=9a7848eef30046edbbb6680d5fca2ec1")
      .expect(200);
    const allPostsAfterDelete = postsResponseAfterDelete.body;

    expect(allPostsAfterDelete.length).toBe(allPosts.length - 1);
    expect(deleteResponse.body).toEqual({ status: "success" });
  });
});
