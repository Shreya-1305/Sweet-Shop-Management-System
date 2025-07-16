const request = require("supertest");
const app = require("../app");
const Sweet = require("../models/sweetModel");

describe("🔍 Search Sweets - GET /api/sweets/search", () => {
  beforeEach(async () => {
    await Sweet.create([
      { name: "Kaju Katli", category: "nut-based", price: 80, quantity: 20 },
      { name: "Rasgulla", category: "milk-based", price: 50, quantity: 15 },
      { name: "Gulab Jamun", category: "milk-based", price: 60, quantity: 10 },
      { name: "Badam Barfi", category: "nut-based", price: 100, quantity: 5 },
      { name: "Jalebi", category: "candy", price: 30, quantity: 25 },
    ]);
  });

  afterEach(async () => {
    await Sweet.deleteMany();
  });

  it("should return sweets that match the name query (case insensitive)", async () => {
    const res = await request(app).get("/api/sweets/search?name=ras");

    expect(res.statusCode).toBe(200);
    expect(res.body.results).toBe(1);
    expect(res.body.data[0].name).toBe("Rasgulla");
  });

  it("should return sweets that match the given category", async () => {
    const res = await request(app).get("/api/sweets/search?category=nut-based");

    expect(res.statusCode).toBe(200);
    expect(res.body.results).toBe(2);

    const names = res.body.data.map((s) => s.name);
    expect(names).toEqual(
      expect.arrayContaining(["Kaju Katli", "Badam Barfi"])
    );
  });

  it("should return sweets within a given price range", async () => {
    const res = await request(app).get(
      "/api/sweets/search?minPrice=40&maxPrice=70"
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.results).toBe(2);

    const names = res.body.data.map((s) => s.name);
    expect(names).toEqual(expect.arrayContaining(["Gulab Jamun", "Rasgulla"]));
  });

  it("should return sweets that match multiple filters", async () => {
    const res = await request(app).get(
      "/api/sweets/search?category=milk-based&minPrice=55"
    );

    expect(res.statusCode).toBe(200);
    expect(res.body.results).toBe(1);
    expect(res.body.data[0].name).toBe("Gulab Jamun");
  });

  it("should return empty array if no sweets match the query", async () => {
    const res = await request(app).get("/api/sweets/search?name=laddu");

    expect(res.statusCode).toBe(200);
    expect(res.body.results).toBe(0);
    expect(res.body.data).toEqual([]);
  });
});
