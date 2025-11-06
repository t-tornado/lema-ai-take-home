import { app } from "..";
import request from "supertest";

describe("Posts", () => {
  it("Adds a new post", async () => {
    const server = request(app);
    const users = await server.get("/users").expect(200);
    const testUserId = users.body[0].id;

    const userPosts = await server
      .get(`/posts?userId=${testUserId}`)
      .expect(200);
    const postCount = userPosts.body.length;

    const newPost = {
      title: "Test Post",
      body: "Test Body",
      user_id: testUserId,
    };
    await server.post("/posts").send(newPost).expect(201);

    const newPostResponse = await server
      .get(`/posts?userId=${testUserId}`)
      .expect(200);
    const newPostCount = newPostResponse.body.length;

    expect(newPostCount).toBe(postCount + 1);
  });
});
