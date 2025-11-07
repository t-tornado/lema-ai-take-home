import { Express } from "express";
import request from "supertest";
import { createExpressApp } from "../utils/createApp";
import { routes } from "../routes";

describe("Posts", () => {
  let testApp: Express;
  beforeAll(async () => {
    const { start, app } = createExpressApp(routes, {
      port: 4000,
      startMessage: (port) => `TEST API server is running on port ${port}`,
    });
    testApp = app;
    start(app);
  });

  it("Adds a new post", async () => {
    const server = request(testApp);
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
