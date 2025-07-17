const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Sweet = require("../models/sweetModel");

describe("Sort Sweets - GET /api/sweets/sort", () => {
  beforeEach(async () => {
    await Sweet.deleteMany();

    await Sweet.create([
      { name: "Barfi", category: "milk-based", price: 20, quantity: 100 },
      { name: "Jalebi", category: "candy", price: 15, quantity: 200 },
      { name: "Kaju Katli", category: "nut-based", price: 40, quantity: 50 },
      { name: "Rasgulla", category: "milk-based", price: 25, quantity: 150 },
    ]);
  });

  afterEach(async () => {
    await Sweet.deleteMany();
  });

  test("should return sweets sorted by name ascending", async () => {
    const res = await request(app).get("/api/sweets/sort?sort=name");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.map((s) => s.name)).toEqual([
      "Barfi",
      "Jalebi",
      "Kaju Katli",
      "Rasgulla",
    ]);
  });

  test("should return sweets sorted by name descending", async () => {
    const res = await request(app).get("/api/sweets/sort?sort=-name");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.map((s) => s.name)).toEqual([
      "Rasgulla",
      "Kaju Katli",
      "Jalebi",
      "Barfi",
    ]);
  });

  test("should return sweets sorted by price ascending", async () => {
    const res = await request(app).get("/api/sweets/sort?sort=price");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.map((s) => s.price)).toEqual([15, 20, 25, 40]);
  });

  test("should return sweets sorted by price descending", async () => {
    const res = await request(app).get("/api/sweets/sort?sort=-price");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.map((s) => s.price)).toEqual([40, 25, 20, 15]);
  });

  test("should return sweets sorted by multiple fields (category then price)", async () => {
    const res = await request(app).get("/api/sweets/sort?sort=category,price");
    expect(res.statusCode).toBe(200);

    const sorted = res.body.data.map((s) => `${s.category}-${s.price}`);
    expect(sorted).toEqual([
      "candy-15",
      "milk-based-20",
      "milk-based-25",
      "nut-based-40",
    ]);
  });

  test("should return 400 if sort field is missing", async () => {
    const res = await request(app).get("/api/sweets/sort");
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Please provide a sort field/i);
  });
});
