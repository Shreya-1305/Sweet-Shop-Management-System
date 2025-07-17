const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/sweetModel");
const mongoose = require("mongoose");
const { afterEach } = require("node:test");

describe("Update Sweet - PATCH /api/sweets/:id", () => {
  let sweet;

  beforeEach(async () => {
    await Sweet.deleteMany();
    sweet = await Sweet.create({
      name: "Ladoo",
      category: "milk-based",
      price: 25,
      quantity: 50,
    });
  });

  afterEach(async () => {
    await Sweet.deleteMany();
  });

  test("should update sweet name and price", async () => {
    const res = await request(app).patch(`/api/sweets/${sweet._id}`).send({
      name: "Boondi Ladoo",
      price: 30,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.name).toBe("Boondi Ladoo");
    expect(res.body.data.price).toBe(30);
  });

  test("should return 404 if sweet does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/sweets/${fakeId}`)
      .send({ name: "Nonexistent Sweet" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  test("should return 400 for invalid sweet ID format", async () => {
    const res = await request(app)
      .patch("/api/sweets/invalid-id")
      .send({ name: "Invalid ID Sweet" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid sweet id/i);
  });

  test("should return 400 for invalid category", async () => {
    const res = await request(app)
      .patch(`/api/sweets/${sweet._id}`)
      .send({ category: "spicy" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/category.*must be one of/i);
  });

  test("should allow partial updates (only quantity)", async () => {
    const res = await request(app)
      .patch(`/api/sweets/${sweet._id}`)
      .send({ quantity: 75 });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.quantity).toBe(75);
  });
});
