const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/sweetModel");
const mongoose = require("mongoose");

describe("Purchase Sweet - PATCH /api/inventory/:id/purchase", () => {
  let sweet;

  beforeEach(async () => {
    await Sweet.deleteMany();
    sweet = await Sweet.create({
      name: "Jalebi",
      category: "candy",
      price: 20,
      quantity: 100,
    });
  });

  afterEach(async () => {
    await Sweet.deleteMany();
  });

  test("should reduce quantity on valid purchase", async () => {
    const res = await request(app)
      .patch(`/api/inventory/${sweet._id}/purchase`)
      .send({ quantity: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/10.*purchased/i);
    expect(res.body.data.quantity).toBe(90);
  });

  test("should return 400 if quantity is missing", async () => {
    const res = await request(app)
      .patch(`/api/inventory/${sweet._id}/purchase`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/provide a valid quantity/i);
  });

  test("should return 400 if quantity is zero or negative", async () => {
    const res = await request(app)
      .patch(`/api/inventory/${sweet._id}/purchase`)
      .send({ quantity: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/provide a valid quantity/i);
  });

  test("should return 400 if purchase exceeds stock", async () => {
    const res = await request(app)
      .patch(`/api/inventory/${sweet._id}/purchase`)
      .send({ quantity: 150 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/not enough stock/i);
  });

  test("should return 404 if sweet not found", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app)
      .patch(`/api/inventory/${fakeId}/purchase`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });

  test("should return 400 for invalid sweet ID format", async () => {
    const res = await request(app)
      .patch("/api/inventory/invalid-id/purchase")
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(400);
  });
});
