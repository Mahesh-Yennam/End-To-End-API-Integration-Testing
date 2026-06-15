const request = require("supertest");
const app = require("../app");
const User = require("../models/user.model");

describe("API Testing", () => {
  test("POST /users should fail without name", async () => {
    const response = await request(app).post("/users").send({});

    expect(response.statusCode).toBe(400);
  });

  test("POST /users should create user in database", async () => {
    await request(app).post("/users").send({
      name: "Mahesh",
    });

    const user = await User.findOne({
      name: "Mahesh",
    });

    expect(user).not.toBeNull();
  });

  test("GET /users", async () => {
    await User.create({
      name: "Mahesh",
    });

    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);

    expect(response.body.length).toBe(1);
  });

  test("PUT /user/:id should update user", async () => {
    const user = await User.create({
      name: "Mahesh",
    });

    const response = await request(app).put(`/users/${user._id}`).send({
      name: "John",
    });

    expect(response.statusCode).toBe(200);

    const updated = await User.findById(user._id);

    expect(updated.name).toBe("John");
  });

  test("PUT should return 404 when user not found", async () => {
    const fakeId = "507f1f77bcf86cd799439011";

    const response = await request(app).put(`/users/${fakeId}`).send({
      name: "John",
    });

    expect(response.statusCode).toBe(404);
  });

  test("DELETE /user/:id should delete user", async () => {
    const user = await User.create({
      name: "Mahesh",
    });

    await request(app).delete(`/users/${user._id}`);

    const deleted = await User.findById(user._id);

    expect(deleted).toBeNull();
  });

  test("DELETE should return 404 when user not found", async () => {
    const fakeId = "507f1f77bcf86cd799439011";

    const response = await request(app).delete(`/users/${fakeId}`);

    expect(response.statusCode).toBe(404);
  });
});
