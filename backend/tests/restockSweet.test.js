const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/sweetModel");
const mongoose = require("mongoose");

describe("Restock Sweet - PATCH /api/sweets/:id/restock", () => {
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

  test("should increase quantity on valid restock", async () => {
    const res = await request(app)
      .patch(`/api/inventory/${sweet._id}/restock`)
      .send({ quantity: 30 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/30.*restocked/i);
    expect(res.body.data.quantity).toBe(80);
  });

  test("should return 400 if quantity is missing", async () => {
    const res = await request(app)
      .patch(`/api/inventory/${sweet._id}/restock`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/provide a valid quantity/i);
  });

  test("should return 400 if quantity is zero or negative", async () => {
    const res = await request(app)
      .patch(`/api/inventory/${sweet._id}/restock`)
      .send({ quantity: -10 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/provide a valid quantity/i);
  });

  test("should return 404 if sweet not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/inventory/${fakeId}/restock`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  test("should return 400 for invalid sweet ID format", async () => {
    const res = await request(app)
      .patch("/api/inventory/invalid-id/restock")
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(400);
  });
});
