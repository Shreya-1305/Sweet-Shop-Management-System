const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/sweetModel");
const mongoose = require("mongoose");

describe("Get Sweet by ID - GET /api/sweets/:id", () => {
  let sweet;

  beforeEach(async () => {
    await Sweet.deleteMany();
    sweet = await Sweet.create({
      name: "Barfi",
      category: "milk-based",
      price: 30,
      quantity: 15,
    });
  });

  afterEach(async () => {
    await Sweet.deleteMany();
  });

  test("should return a sweet with valid ID", async () => {
    const res = await request(app).get(`/api/sweets/${sweet._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.name).toBe("Barfi");
  });

  test("should return 404 for a non-existent ID", async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/sweets/${nonExistentId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  test("should return 400 for invalid ID format", async () => {
    const res = await request(app).get(`/api/sweets/invalid-id`);
    expect(res.statusCode).toBe(400);
  });
});
